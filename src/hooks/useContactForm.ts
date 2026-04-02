"use client";

import { useState } from "react";
import { contactSchema, type ContactFields, type FieldErrors, type SubmitStatus } from "@/lib/contactSchema";


/**
 * Manages the full contact form lifecycle:
 * - Controlled field values
 * - Per-field Zod validation (on blur + live while touched)
 * - Email delivery via Resend (POST /api/contact)
 * - Submit status ("idle" | "loading" | "success" | "error")
 *
 * Schema lives in: `@/lib/contactSchema.ts`
 * Email template lives in: `@/lib/contactEmailTemplate.ts`
 *
 * @example
 * const { values, fieldErrors, touched, focused, status, serverError,
 *         handleChange, handleBlur, handleFocus, handleSubmit, borderClass } = useContactForm();
 */
export function useContactForm() {
  const [focused, setFocused] = useState<keyof ContactFields | null>(null);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [values, setValues] = useState<ContactFields>({ name: "", email: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState("");

  // ── Validate a single field ──
  const validateField = (field: keyof ContactFields, value: string) => {
    const result = contactSchema.shape[field].safeParse(value);
    setFieldErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0].message,
    }));
  };

  // ── Handlers ──
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof ContactFields; value: string };
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleFocus = (field: keyof ContactFields) => setFocused(field);

  const handleBlur = (field: keyof ContactFields) => {
    setFocused(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, values[field]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });
    const result = contactSchema.safeParse(values);

    if (!result.success) {
      const errs: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactFields;
        if (!errs[key]) errs[key] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setValues({ name: "", email: "", message: "" });
        setTouched({});
        setFieldErrors({});
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setServerError(data.message ?? "Something went wrong. Please try again.");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setServerError("Network error. Please check your connection and try again.");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  // ── Derived input border style ──
  const borderClass = (field: keyof ContactFields): string => {
    if (fieldErrors[field] && touched[field])
      return "border-red-500/70 shadow-[0_0_14px_rgba(239,68,68,0.2)]";
    if (focused === field)
      return "border-primary/70 shadow-[0_0_18px_rgba(220,20,60,0.25)]";
    return "border-white/[0.07] hover:border-white/20";
  };

  return {
    values,
    fieldErrors,
    touched,
    focused,
    status,
    serverError,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    borderClass,
  };
}
