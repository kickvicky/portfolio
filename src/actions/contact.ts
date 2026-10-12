"use server";

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
    return { status: "error", message: "The contact form is not configured yet. Please email me directly.", values };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio message from ${values.name.replace(/[\r\n]+/g, " ")}`,
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
