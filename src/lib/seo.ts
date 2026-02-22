import type { Metadata } from "next";

const SITE_NAME = "DevAsk";
const SITE_URL = "https://it-interview-questions.vercel.app";

export function createMetadata(options: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${options.path ?? ""}`;
  return {
    title: `${options.title} | ${SITE_NAME}`,
    description: options.description,
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: options.title,
      description: options.description,
    },
    alternates: { canonical: url },
    ...(options.noIndex && { robots: { index: false, follow: false } }),
  };
}

export function questionJsonLd(question: {
  title: string;
  answer: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Question",
    name: question.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: question.answer,
    },
    url: `${SITE_URL}/question/${question.slug}`,
  };
}

export function technologyJsonLd(technology: {
  name: string;
  slug: string;
  questionCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Pytania rekrutacyjne — ${technology.name}`,
    description: `Przeglądaj ${technology.questionCount} pytań rekrutacyjnych z ${technology.name}`,
    url: `${SITE_URL}/technology/${technology.slug}`,
  };
}

export { SITE_NAME, SITE_URL };
