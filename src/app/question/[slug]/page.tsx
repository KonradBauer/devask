import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 3600;
import { createMetadata, questionJsonLd } from "@/lib/seo";
import { dict } from "@/lib/i18n";
import QuestionCard from "@/components/QuestionCard";
import AdComponent from "@/components/AdComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReportButton from "./ReportButton";
import QuestionViewTracker from "./QuestionViewTracker";
import QuizAnswer from "./QuizAnswer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: question } = await supabase
    .from("questions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!question) return {};
  return createMetadata({
    title: question.title,
    description: `Pytanie rekrutacyjne ${question.technology_name} na poziomie ${question.difficulty}. Zgłoszone ${question.interview_count} razy.`,
    path: `/question/${slug}`,
  });
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;

  const t = dict.pl;

  const { data: question } = await supabase
    .from("questions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!question) notFound();

  const { data: related } = await supabase
    .from("questions")
    .select("*")
    .eq("technology_slug", question.technology_slug)
    .eq("status", "approved")
    .neq("id", question.id)
    .order("interview_count", { ascending: false })
    .limit(5);

  const jsonLd = questionJsonLd({
    title: question.title,
    answer: question.answer,
    slug: question.slug,
  });

  const difficultyColors: Record<string, string> = {
    junior: "bg-junior/15 text-junior",
    mid: "bg-mid/15 text-mid",
    senior: "bg-senior/15 text-senior",
  };

  const title = question.title;
  const answer = question.answer;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <QuestionViewTracker slug={question.slug} technology={question.technology_name} />

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <article>
          <div className="mb-6">
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: question.technology_name, href: `/technology/${question.technology_slug}` },
                { label: question.title },
              ]}
            />

            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${difficultyColors[question.difficulty] ?? ""}`}
              >
                {question.difficulty}
              </span>
              <span className="text-xs text-muted">
                {question.interview_count} {t.question.reported}
              </span>
            </div>

            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {title}
            </h1>
          </div>

          <QuizAnswer answer={answer} label={t.question.answer} />

          <ReportButton questionId={question.id} strings={t.question} />

          <AdComponent size="inline" className="mt-8" />

          {related && related.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-lg font-semibold">
                {t.technology.more(question.technology_name)}
              </h2>
              <div className="flex flex-col gap-3">
                {related.map((q, i) => (
                  <div key={q.id}>
                    <QuestionCard question={q} />
                    {(i + 1) % 5 === 0 && <AdComponent size="inline" />}
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        <AdComponent size="sidebar" />
      </div>

      <AdComponent size="sticky" />
    </div>
  );
}
