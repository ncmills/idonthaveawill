import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Free Will Creator | idonthaveawill.com — Create a Legal Will in 10 Minutes",
  description:
    "Create a simple, state-compliant last will and testament for free. No account needed. Covers all 50 US states and DC. Your data never leaves your browser.",
  openGraph: {
    title: "You Don't Have a Will. Let's Fix That.",
    description:
      "Create a free, legally formatted will in 10 minutes. All 50 states + DC. No account needed.",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
