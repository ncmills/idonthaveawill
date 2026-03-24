import QuestionnaireShell from "@/components/questionnaire/QuestionnaireShell";

export const metadata = {
  title: "Create Your Will | idonthaveawill.com",
  description: "Answer simple questions and we'll generate a legally formatted will for your state.",
};

export default function CreatePage() {
  return <QuestionnaireShell />;
}
