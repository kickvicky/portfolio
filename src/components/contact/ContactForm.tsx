"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactFormState } from "@/actions/contact";
import Arrow from "@/components/icons/Arrow";

const initialState: ContactFormState = { status: "idle" };

function buttonLabel(pending: boolean, status: ContactFormState["status"]): string {
  if (pending) return "Transmitting...";
  if (status === "success") return "Message queued!";
  return "Send transmission";
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);

  // suppressHydrationWarning on form controls: autofill / password-manager extensions (e.g. Island browser)
  // tag inputs and buttons with their own attributes before hydration. These elements have no
  // server/client-dependent attributes, so silencing attribute mismatches here hides nothing real.
  return (
    <form className="relative space-y-5 bg-paper p-7" action={formAction}>
      <label className="field">
        <span>01 / YOUR NAME</span>
        <input
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="TYPE HERE..."
          defaultValue={state.values?.name}
          suppressHydrationWarning
        />
      </label>
      <label className="field">
        <span>02 / EMAIL ADDRESS</span>
        <input
          suppressHydrationWarning
          name="email"
          required
          type="email"
          maxLength={254}
          autoComplete="email"
          placeholder="YOU@INTERNET.COM"
          defaultValue={state.values?.email}
        />
      </label>
      <label className="field">
        <span>03 / TRANSMISSION</span>
        <textarea name="message" required rows={4} maxLength={5000} placeholder="WHAT'S ON YOUR MIND?" defaultValue={state.values?.message} />
      </label>

      {/* Honeypot field — hidden from people, tempting to bots. Name/label are deliberately non-semantic
          so browser autofill and password managers don't fill it (which would silently drop real messages). */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input
            name="hp_check"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            data-1p-ignore
            data-lpignore="true"
            data-form-type="other"
            suppressHydrationWarning
          />
        </label>
      </div>

      <p aria-live="polite" className="min-h-4 font-mono text-[10px] font-bold uppercase">
        {state.status === "error" ? state.message : null}
      </p>

      <button
        className="brutal-button flex w-full items-center justify-between bg-yellow px-5 py-4 font-mono text-xs font-black uppercase disabled:opacity-60"
        type="submit"
        disabled={pending}
        suppressHydrationWarning
      >
        {buttonLabel(pending, state.status)} <Arrow />
      </button>
    </form>
  );
}
