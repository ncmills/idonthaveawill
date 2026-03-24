import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Will Draft — Review & Print",
  description:
    "Review your generated will draft, follow the state-specific execution checklist, and print or save as PDF.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
