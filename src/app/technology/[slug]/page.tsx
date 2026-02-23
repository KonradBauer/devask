import { notFound } from "next/navigation";
import { supabase, type Question } from "@/lib/supabaseClient";
import { createMetadata, technologyJsonLd } from "@/lib/seo";
import { dict } from "@/lib/i18n";
import { techIconMap } from "@/lib/techIcons";
import QuestionCard from "@/components/QuestionCard";
import AdComponent from "@/components/AdComponent";
import SortControls from "./SortControls";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: tech } = await supabase
    .from("technologies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tech) return {};
  return createMetadata({
    title: `Pytania rekrutacyjne — ${tech.name}`,
    description: `Przeglądaj ${tech.question_count} pytań rekrutacyjnych z ${tech.name} posortowanych wg trudności, popularności i daty.`,
    path: `/technology/${slug}`,
  });
}

function sortQuestions(questions: Question[], sort: string): Question[] {
  const sorted = [...questions];
  switch (sort) {
    case "difficulty":
      const order = { junior: 0, mid: 1, senior: 2 };
      return sorted.sort(
        (a, b) =>
          (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1)
      );
    case "most-asked":
      return sorted.sort(
        (a, b) => b.interview_count - a.interview_count
      );
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }
}

export default async function TechnologyPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { sort = "most-asked" } = await searchParams;

  const t = dict.pl;

  const [techResult, questionsResult] = await Promise.all([
    supabase.from("technologies").select("*").eq("slug", slug).single(),
    supabase
      .from("questions")
      .select("*")
      .eq("technology_slug", slug)
      .eq("status", "approved"),
  ]);

  const tech = techResult.data;
  if (!tech) notFound();

  const questions = sortQuestions(questionsResult.data ?? [], sort);
  const jsonLd = technologyJsonLd({
    name: tech.name,
    slug: tech.slug,
    questionCount: tech.question_count,
  });

  const Icon = techIconMap[tech.slug];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {Icon ? (
            <Icon className="h-10 w-10 text-foreground/80" />
          ) : (
            <span className="text-4xl">{tech.icon}</span>
          )}
          <h1 className="text-2xl font-bold sm:text-3xl">
            {t.technology.heading(tech.name)}
          </h1>
        </div>
        <p className="text-muted">{t.technology.count(tech.question_count)}</p>
      </div>

      <SortControls current={sort} labels={t.sort} />

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-3">
          {questions.length === 0 && (
            <p className="text-muted py-10 text-center">
              {t.technology.noQuestions(tech.name)}
            </p>
          )}
          {questions.map((q, i) => (
            <div key={q.id}>
              <QuestionCard question={q} />
              {(i + 1) % 5 === 0 && <AdComponent size="inline" className="mt-3" />}
            </div>
          ))}
        </div>

        <AdComponent size="sidebar" />
      </div>

      <AdComponent size="sticky" />
    </div>
  );
}
