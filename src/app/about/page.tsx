import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { dict } from "@/lib/i18n";

export const metadata = createMetadata({
  title: "O projekcie",
  description:
    "Dowiedz się więcej o DevAsk — darmowej, otwartej platformie do dzielenia się pytaniami rekrutacyjnymi.",
  path: "/about",
});

export default function AboutPage() {
  const t = dict.pl.about;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl">{t.title}</h1>

      <div className="flex flex-col gap-6 text-sm leading-relaxed text-foreground/90">
        <p>{t.intro}</p>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            {t.howItWorks}
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-muted">
            {t.howItWorksList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            {t.whyExists}
          </h2>
          <p className="text-muted">{t.whyExistsText}</p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            {t.contributing}
          </h2>
          <p className="text-muted">
            <Link
              href="/add-question"
              className="text-primary hover:text-primary-hover"
            >
              Dodaj pytanie
            </Link>
            {". "}
            {t.contributingText}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            {t.techStack}
          </h2>
          <p className="text-muted">{t.techStackText}</p>
        </div>
      </div>
    </div>
  );
}
