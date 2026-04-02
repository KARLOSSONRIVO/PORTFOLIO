import { z } from "zod";

/**
 * Zod validation schema for the portfolio contact form.
 * Used by both the form hook (client-side) and any server-side validation.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer.")
    .regex(
      /^[a-zA-Z\s'\-]+$/,
      "Name can only contain letters, spaces, hyphens, and apostrophes."
    ),

  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    // Reject addresses with no TLD dot after @, e.g. "user@domain" without ".com"
    .refine(
      (v) => /^[^@]+@[^@]+\.[^@]{2,}$/.test(v),
      "Please enter a complete email address (e.g. you@example.com)."
    ),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export type ContactFields = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;
export type SubmitStatus = "idle" | "loading" | "success" | "error";
