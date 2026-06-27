"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/cn";

type FieldKey = "firstName" | "lastName" | "email" | "phone" | "message";
type Errors = Partial<Record<Exclude<FieldKey, "phone">, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState<Record<FieldKey, string>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: FieldKey) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const validate = () => {
    const next: Errors = {};
    if (!values.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!values.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.message.trim())
      next.message = "Tell us a little about the project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      `New enquiry — ${values.firstName} ${values.lastName}`,
    );
    const body = encodeURIComponent(
      `Name: ${values.firstName} ${values.lastName}\n` +
        `Email: ${values.email}\n` +
        `Phone: ${values.phone || "—"}\n\n` +
        `${values.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border-t border-ink/10 pt-10">
        <p className="text-display text-[clamp(1.75rem,4vw,3rem)]">
          Thank you — your message is on its way.
        </p>
        <p className="mt-5 max-w-md text-ink-soft">
          We&apos;ll be in touch within two working days. If your mail client
          didn&apos;t open, write to us directly at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="text-ink underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setValues({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              message: "",
            });
          }}
          className="mt-8 text-sm tracking-tight text-ink-soft underline underline-offset-4 transition-colors hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field
          label="First name"
          value={values.firstName}
          onChange={update("firstName")}
          error={errors.firstName}
          autoComplete="given-name"
        />
        <Field
          label="Last name"
          value={values.lastName}
          onChange={update("lastName")}
          error={errors.lastName}
          autoComplete="family-name"
        />
        <Field
          label="Email"
          type="email"
          value={values.email}
          onChange={update("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone (optional)"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          autoComplete="tel"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          placeholder="What are you hoping to make?"
          className={cn(
            "resize-none border-b bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink-muted focus:border-ink",
            errors.message ? "border-ink" : "border-ink/20",
          )}
        />
        {errors.message ? (
          <span className="text-sm text-ink-soft">{errors.message}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-ink-muted">
          By submitting, you agree we may use your details to respond to your
          enquiry. We never share them, and we don&apos;t send marketing.
        </p>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-sm font-medium text-paper transition-opacity duration-500 hover:opacity-90"
        >
          Send message
          <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
            ↗
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={cn(
          "border-b bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink",
          error ? "border-ink" : "border-ink/20",
        )}
      />
      {error ? <span className="text-sm text-ink-soft">{error}</span> : null}
    </div>
  );
}
