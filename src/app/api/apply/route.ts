import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  CV_ACCEPTED_EXTENSIONS,
  CV_MAX_SIZE_BYTES,
  PORTFOLIO_ACCEPTED_EXTENSIONS,
  PORTFOLIO_MAX_SIZE_BYTES,
  hasAcceptedExtension,
} from "@/lib/applicationValidation";

export const runtime = "nodejs";

// Simple in-memory rate limit per server instance (best-effort; not a
// substitute for a real rate limiter behind the edge/CDN if abuse becomes
// an issue).
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "location",
  "experience",
  "skills",
  "intro",
  "whyJoin",
  "whyFit",
  "availability",
  "department",
  "position",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const formData = await req.formData();

    // honeypot — if a bot filled this hidden field, quietly accept and drop
    const honeypot = (formData.get("company_website") as string) ?? "";
    if (honeypot.trim()) {
      return NextResponse.json({ ok: true });
    }

    const values: Record<string, string> = {};
    for (const field of REQUIRED_FIELDS) {
      const raw = formData.get(field);
      values[field] = typeof raw === "string" ? raw.trim() : "";
      if (!values[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!EMAIL_REGEX.test(values.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const linkedin = ((formData.get("linkedin") as string) ?? "").trim();
    const github = ((formData.get("github") as string) ?? "").trim();
    const portfolioUrl = ((formData.get("portfolioUrl") as string) ?? "").trim();
    const expectedSalary = ((formData.get("expectedSalary") as string) ?? "").trim();

    const cv = formData.get("cv") as File | null;
    if (!cv || cv.size === 0) {
      return NextResponse.json(
        { error: "A CV/Resume file is required." },
        { status: 400 }
      );
    }
    if (!hasAcceptedExtension(cv.name, CV_ACCEPTED_EXTENSIONS)) {
      return NextResponse.json(
        { error: "CV must be a PDF, DOC, or DOCX file." },
        { status: 400 }
      );
    }
    if (cv.size > CV_MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "CV file is too large. Max size is 5MB." },
        { status: 400 }
      );
    }

    const portfolioFile = formData.get("portfolioFile") as File | null;
    let portfolioAttachment: { filename: string; content: Buffer } | null = null;
    if (portfolioFile && portfolioFile.size > 0) {
      if (!hasAcceptedExtension(portfolioFile.name, PORTFOLIO_ACCEPTED_EXTENSIONS)) {
        return NextResponse.json(
          { error: "Portfolio file type is not supported." },
          { status: 400 }
        );
      }
      if (portfolioFile.size > PORTFOLIO_MAX_SIZE_BYTES) {
        return NextResponse.json(
          { error: "Portfolio file is too large. Max size is 15MB." },
          { status: 400 }
        );
      }
      portfolioAttachment = {
        filename: portfolioFile.name,
        content: Buffer.from(await portfolioFile.arrayBuffer()),
      };
    }

    const cvBuffer = Buffer.from(await cv.arrayBuffer());

    // ── Email credentials come from environment variables only. ──
    // Configure these in your hosting provider's dashboard (e.g. Vercel
    // → Project → Settings → Environment Variables). Never commit real
    // values — see .env.example.
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE,
      CAREERS_EMAIL,
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CAREERS_EMAIL) {
      console.error("Missing SMTP configuration environment variables.");
      return NextResponse.json(
        {
          error:
            "The application system isn't fully configured yet. Please try again later or reach out directly.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT ? parseInt(SMTP_PORT, 10) : 587,
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const textBody = `New job application received.

Department: ${values.department}
Position: ${values.position}

Full Name: ${values.fullName}
Email: ${values.email}
Phone: ${values.phone}
Location: ${values.location}
LinkedIn: ${linkedin || "—"}
GitHub: ${github || "—"}
Portfolio URL: ${portfolioUrl || "—"}
Years of Experience: ${values.experience}
Availability: ${values.availability}
Expected Salary: ${expectedSalary || "—"}

Relevant Skills:
${values.skills}

Short Introduction:
${values.intro}

Why join PenumbraStudio:
${values.whyJoin}

Why they're a good fit:
${values.whyFit}
`;

    await transporter.sendMail({
      from: `"PenumbraStudio Careers" <${SMTP_USER}>`,
      to: CAREERS_EMAIL,
      replyTo: values.email,
      subject: `New Job Application — ${values.position} — ${values.fullName}`,
      text: textBody,
      attachments: [
        { filename: cv.name, content: cvBuffer },
        ...(portfolioAttachment ? [portfolioAttachment] : []),
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Application submission failed:", err);
    return NextResponse.json(
      { error: "Something went wrong while sending your application." },
      { status: 500 }
    );
  }
}
