import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import { studio } from "@/data/content";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const body = Manrope({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = "https://example.com"; // update once the domain is live

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${studio.name} — Independent Game Studio`,
  description: studio.supportingText,
  openGraph: {
    title: `${studio.name} — Independent Game Studio`,
    description: studio.supportingText,
    url: siteUrl,
    siteName: studio.name,
    images: ["/images/studio/og-cover.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${studio.name} — Independent Game Studio`,
    description: studio.supportingText,
    images: ["/images/studio/og-cover.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
