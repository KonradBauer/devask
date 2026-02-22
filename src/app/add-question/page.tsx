import { createMetadata } from "@/lib/seo";
import { dict } from "@/lib/i18n";
import AddQuestionForm from "@/components/AddQuestionForm";

export const metadata = createMetadata({
  title: "Dodaj pytanie",
  description:
    "Dodaj nowe pytanie rekrutacyjne i pomóż społeczności w przygotowaniach do rozmów IT.",
  path: "/add-question",
});

export default function AddQuestionPage() {
  const t = dict.pl;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
        {t.addQuestion.title}
      </h1>
      <p className="mb-8 text-muted">{t.addQuestion.subtitle}</p>
      <AddQuestionForm strings={t.addQuestion} />
    </div>
  );
}
