"use client";

import { useEffect, useRef, useState } from "react";
import {
  CV_ACCEPTED_EXTENSIONS,
  CV_MAX_SIZE_BYTES,
  PORTFOLIO_ACCEPTED_EXTENSIONS,
  PORTFOLIO_MAX_SIZE_BYTES,
  hasAcceptedExtension,
  formatBytes,
} from "@/lib/applicationValidation";

interface Props {
  department: string;
  position: string;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

const experienceOptions = [
  "Less than 1 year",
  "1–2 years",
  "3–5 years",
  "6–10 years",
  "10+ years",
];

const availabilityOptions = [
  "Immediately",
  "2 weeks notice",
  "1 month notice",
  "2+ months notice",
  "Other",
];

export default function ApplicationModal({ department, position, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fileErrors, setFileErrors] = useState<{ cv?: string; portfolio?: string }>({});

  // lock scroll + close on escape
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function validateFile(
    file: File | undefined,
    accepted: string[],
    maxSize: number,
    required: boolean
  ): string | undefined {
    if (!file || file.size === 0) {
      return required ? "This file is required." : undefined;
    }
    if (!hasAcceptedExtension(file.name, accepted)) {
      return `Unsupported file type. Accepted: ${accepted.join(", ")}`;
    }
    if (file.size > maxSize) {
      return `File is too large (${formatBytes(file.size)}). Max size is ${formatBytes(
        maxSize
      )}.`;
    }
    return undefined;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // honeypot — if filled, silently pretend success (bot trap)
    if ((formData.get("company_website") as string)?.trim()) {
      setStatus("success");
      return;
    }

    const cvFile = formData.get("cv") as File | null;
    const portfolioFile = formData.get("portfolioFile") as File | null;

    const cvError = validateFile(
      cvFile ?? undefined,
      CV_ACCEPTED_EXTENSIONS,
      CV_MAX_SIZE_BYTES,
      true
    );
    const portfolioError = validateFile(
      portfolioFile && portfolioFile.size > 0 ? portfolioFile : undefined,
      PORTFOLIO_ACCEPTED_EXTENSIONS,
      PORTFOLIO_MAX_SIZE_BYTES,
      false
    );

    if (cvError || portfolioError) {
      setFileErrors({ cv: cvError, portfolio: portfolioError });
      return;
    }
    setFileErrors({});

    formData.set("department", department);
    formData.set("position", position);

    setStatus("submitting");

    try {
      const res = await fetch("/api/apply", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(
          data?.error ||
            "Something went wrong while sending your application. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg(
        "Something went wrong while sending your application. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-0 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-modal-title"
    >
      {/* backdrop */}
      <button
        aria-label="Close application form"
        onClick={onClose}
        className="fixed inset-0 bg-ink/90 backdrop-blur-sm"
      />

      <div
        ref={dialogRef}
        className="relative w-full md:max-w-2xl bg-charcoal border hairline md:my-10"
      >
        {/* header */}
        <div className="sticky top-0 bg-charcoal border-b hairline px-6 md:px-10 py-6 flex items-start justify-between gap-4 z-10">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-ember mb-1">
              {department}
            </p>
            <h3
              id="application-modal-title"
              className="font-display font-bold uppercase text-xl md:text-2xl"
            >
              Apply — {position}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-mist hover:text-paper transition-colors text-2xl leading-none px-2 -mt-1"
          >
            ×
          </button>
        </div>

        <div className="px-6 md:px-10 py-8">
          {status === "success" ? (
            <div className="py-10 text-center">
              <p className="font-display font-bold uppercase text-2xl mb-4">
                Application Sent
              </p>
              <p className="text-mist leading-relaxed max-w-md mx-auto">
                Thank you for your application. We have received your
                information and will review your application.
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-7 py-3.5 bg-paper text-ink text-xs tracking-[0.2em] uppercase font-semibold hover:bg-ember transition-colors duration-300"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* honeypot field — hidden from real users */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <input type="hidden" name="department" value={department} />
              <input type="hidden" name="position" value={position} />

              <Field label="Full Name" required>
                <input name="fullName" type="text" required className={inputClass} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Email Address" required>
                  <input name="email" type="email" required className={inputClass} />
                </Field>
                <Field label="Phone Number" required>
                  <input name="phone" type="tel" required className={inputClass} />
                </Field>
              </div>

              <Field label="Country / Location" required>
                <input name="location" type="text" required className={inputClass} />
              </Field>

              <div className="grid sm:grid-cols-3 gap-6">
                <Field label="LinkedIn Profile">
                  <input name="linkedin" type="url" className={inputClass} placeholder="https://" />
                </Field>
                <Field label="GitHub Profile">
                  <input name="github" type="url" className={inputClass} placeholder="https://" />
                </Field>
                <Field label="Portfolio Website">
                  <input name="portfolioUrl" type="url" className={inputClass} placeholder="https://" />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Years of Experience" required>
                  <select name="experience" required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    {experienceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Availability" required>
                  <select name="availability" required className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    {availabilityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Relevant Skills" required>
                <textarea
                  name="skills"
                  required
                  rows={2}
                  className={inputClass}
                  placeholder="e.g. Unreal Engine, C++, Blender, Wwise…"
                />
              </Field>

              <Field label="Short Introduction / About Yourself" required>
                <textarea name="intro" required rows={3} className={inputClass} />
              </Field>

              <Field label="Why do you want to join PenumbraStudio?" required>
                <textarea name="whyJoin" required rows={3} className={inputClass} />
              </Field>

              <Field label="Why are you a good fit for this position?" required>
                <textarea name="whyFit" required rows={3} className={inputClass} />
              </Field>

              <Field label="Expected Salary">
                <input name="expectedSalary" type="text" className={inputClass} placeholder="Optional" />
              </Field>

              <Field label="CV / Resume" required hint="PDF, DOC, or DOCX — max 5MB">
                <input
                  name="cv"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  className={fileInputClass}
                />
                {fileErrors.cv && <p className={errorClass}>{fileErrors.cv}</p>}
              </Field>

              <Field
                label="Portfolio / Additional Files"
                hint="Optional — PDF, DOC, DOCX, image, or ZIP — max 15MB"
              >
                <input
                  name="portfolioFile"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                  className={fileInputClass}
                />
                {fileErrors.portfolio && (
                  <p className={errorClass}>{fileErrors.portfolio}</p>
                )}
              </Field>

              {status === "error" && (
                <p className="text-sm text-ember border border-ember/40 px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full px-7 py-4 bg-paper text-ink text-xs tracking-[0.2em] uppercase font-semibold hover:bg-ember transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Sending…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-ink border hairline px-4 py-3 text-sm text-paper placeholder:text-mist/60 focus:outline-none focus:border-ember transition-colors duration-200";

const fileInputClass =
  "w-full bg-ink border hairline px-4 py-3 text-sm text-mist file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-ash file:text-paper file:text-[11px] file:tracking-[0.15em] file:uppercase focus:outline-none focus:border-ember transition-colors duration-200";

const errorClass = "text-[11px] text-ember mt-2";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.15em] uppercase text-mist mb-2">
        {label} {required && <span className="text-ember">*</span>}
      </span>
      {children}
      {hint && <span className="block text-[11px] text-mist mt-2">{hint}</span>}
    </label>
  );
}
