"use client";

import { Send, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useContactForm } from "@/hooks/useContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const inputBase =
  "w-full bg-[#0e0e0e] text-white placeholder:text-white/25 font-body text-base rounded-xl px-5 py-4 outline-none border transition-all duration-300 resize-none";

export function Contact() {
  const { ref, isInView } = useScrollReveal({ margin: "-60px" });
  const {
    values,
    fieldErrors,
    touched,
    status,
    serverError,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    borderClass,
  } = useContactForm();

  return (
    <section
      id="contact"
      className="py-32 px-4 md:px-8 bg-surface text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto relative z-10 flex flex-col items-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <motion.p
          custom={0}
          variants={fadeUp}
          className="font-label text-primary tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-4"
        >
          <span className="w-12 h-[1px] bg-primary/50" />
          What&apos;s Next?
          <span className="w-12 h-[1px] bg-primary/50" />
        </motion.p>

        <motion.h2
          custom={1}
          variants={fadeUp}
          className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-6"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="font-body text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I&apos;m currently looking for new opportunities and collaborations. Whether you
          have a question, a project idea, or just want to say hi — drop me a message below.
        </motion.p>

        {/* Form */}
        <motion.form
          custom={3}
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 text-left"
          noValidate
        >
          {/* Honeypot */}
          <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              id="contact-name"
              label="Full Name"
              error={touched.name ? fieldErrors.name : undefined}
            >
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={values.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                className={`${inputBase} ${borderClass("name")}`}
              />
            </Field>

            <Field
              id="contact-email"
              label="Email Address"
              error={touched.email ? fieldErrors.email : undefined}
            >
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                className={`${inputBase} ${borderClass("email")}`}
              />
            </Field>
          </div>

          {/* Message */}
          <Field
            id="contact-message"
            label="Message"
            error={touched.message ? fieldErrors.message : undefined}
            hint={`${values.message.length} / 2000`}
          >
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder="Tell me about your project, idea, or just say hi..."
              value={values.message}
              onChange={handleChange}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              className={`${inputBase} ${borderClass("message")}`}
            />
          </Field>

          {/* Server feedback */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 text-emerald-400 font-body text-sm bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                Message sent! I&apos;ll get back to you soon.
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 text-red-400 font-body text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <div className="flex justify-center mt-2">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={status !== "loading" ? { scale: 1.05 } : {}}
              whileTap={status !== "loading" ? { scale: 0.97 } : {}}
              className="group inline-flex items-center gap-3 px-10 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(220,20,60,0.3)] hover:shadow-[0_0_40px_rgba(220,20,60,0.55)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}

// ─── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-label text-xs uppercase tracking-widest text-on-surface-variant/70"
        >
          {label}
        </label>
        {hint && (
          <span className="font-label text-xs text-on-surface-variant/40">{hint}</span>
        )}
      </div>

      {children}

      <AnimatePresence>
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-red-400 font-body text-xs mt-0.5"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
