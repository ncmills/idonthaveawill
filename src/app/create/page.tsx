import type { Metadata } from "next";
import { buildOpenGraph } from "@/lib/og";
import QuestionnaireShell from "@/components/questionnaire/QuestionnaireShell";

export const metadata: Metadata = {
  title: "Draft Your Will — Free Questionnaire",
  description:
    "Answer plain-English questions about your family, assets, and wishes. We generate a draft will formatted for your state. Free, private, no account needed.",
  alternates: {
    canonical: "https://idonthaveawill.com/create",
  },
  openGraph: buildOpenGraph({
    title: "Draft Your Will in 10 Minutes",
    description:
      "Answer simple questions and get a draft will formatted for your state. Free, private, no account needed.",
    path: "/create",
  }),
};

export default function CreatePage() {
  return <QuestionnaireShell />;
}
