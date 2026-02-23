import Link from "next/link";

type Crumb = {
  label: string;
  href?: string;
};

const SITE_URL = "https://it-interview-questions.vercel.app";

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted">
        {items.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
