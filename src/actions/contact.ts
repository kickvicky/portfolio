"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";
import { keyPrefix, redis, visitorId } from "@/lib/redis";

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  values?: ContactFormValues;
};

const LIMITS = { name: 100, email: 254, message: 5000 } as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Two limits that stop different attacks:
// - perVisitor: one person or script hammering the form (sliding window, so there's no burst at the window edge).
// - daily: a global ceiling that protects the Resend quota (~100/day free) and your inbox even if a
//   botnet rotates IPs. The trade-off: once it trips, real visitors are blocked until the window resets.
const limiters = redis
  ? {
      perVisitor: new Ratelimit({ redis, prefix: `${keyPrefix}:contact:visitor`, limiter: Ratelimit.slidingWindow(5, "10 m") }),
      daily: new Ratelimit({ redis, prefix: `${keyPrefix}:contact:daily`, limiter: Ratelimit.fixedWindow(50, "1 d") }),
    }
  : null;

if (!limiters && process.env.NODE_ENV === "production") {
  console.warn("[contact] UPSTASH_REDIS_REST_URL / _TOKEN not set — contact form is NOT rate limited");
}

/** Fails open: if Upstash is unreachable the message still goes through (the honeypot still applies). */
async function withinLimit(limiter: Ratelimit | undefined, id: string): Promise<boolean> {
  if (!limiter) return true;
  try {
    return (await limiter.limit(id)).success;
  } catch (error) {
    console.error("[contact] Rate limiter unavailable, allowing request", error);
    return true;
  }
}

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: ContactFormValues): string | null {
  if (!values.name || values.name.length > LIMITS.name) return "Please enter your name (max 100 characters).";
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > LIMITS.email) return "Please enter a valid email address.";
  if (!values.message || values.message.length > LIMITS.message) return "Please enter a message (max 5000 characters).";
  return null;
}

export async function sendContactMessage(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Honeypot: real users never see or fill this field; bots usually do.
  if (readField(formData, "hp_check")) return { status: "success" };

  const values: ContactFormValues = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    message: readField(formData, "message"),
  };

  // Checked before validation, so invalid junk submissions also count against the sender.
  if (!(await withinLimit(limiters?.perVisitor, visitorId(await headers())))) {
    return { status: "error", message: "Too many messages in a short time. Please wait a few minutes and try again.", values };
  }

  const validationError = validate(values);
  if (validationError) return { status: "error", message: validationError, values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set — message logged instead of sent:", values);
      return { status: "success" };
    }
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return { status: "error", message: "The contact form is not configured yet. Please reach out on LinkedIn instead.", values };
  }

  // Checked last, right before sending, so junk that fails validation can't use up the daily allowance.
  if (!(await withinLimit(limiters?.daily, "all"))) {
    return { status: "error", message: "The inbox has hit its limit for today. Please try again tomorrow.", values };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      // Don't leave the visitor staring at "Transmitting..." if Resend hangs.
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio message from ${values.name.replace(/[\r\n\u2028\u2029]+/g, " ")}`,
        text: `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend responded with", response.status, await response.text());
      return { status: "error", message: "Something went wrong sending your message. Please try again.", values };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Failed to reach Resend", error);
    return { status: "error", message: "Something went wrong sending your message. Please try again.", values };
  }
}
