import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Free Will Creator | idonthaveawill.com — Draft a Simple Will in 10 Minutes",
  description:
    "A free self-help tool to draft a simple will. No account needed. Covers all 50 US states and DC. Your data never leaves your browser. Not legal advice — have an attorney review your draft.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "You Don't Have a Will. Let's Fix That.",
    description:
      "A free tool to help you draft a simple will in about 10 minutes. All 50 states + DC. No account needed.",
    type: "website",
    url: "https://idonthaveawill.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
