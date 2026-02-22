Napisz **pełny system reklamowy** dla aplikacji Next.js 16.1.6 + TailwindCSS (TypeScript), która wyświetla pytania IT dla devów.  
Claude ma wygenerować:

1. Komponent `AdComponent.tsx` obsługujący trzy warianty reklam:
    - `sticky` → fixed bottom, full width, dark mode kompatybilny, z-index wysoki
    - `sidebar` → widoczny tylko na desktop (lg+), sticky top-20, szerokość ~300px
    - `inline` → wstawiany w feedzie pytań, margin-y 4, co 5 pytań desktop / co 6 pytań mobile
    - `responsive` → dopasowuje się automatycznie do urządzenia
    - placeholder dla Google AdSense: `<div className="bg-gray-200 dark:bg-gray-800 text-center p-4">Ad Placeholder</div>`
    - propsy: `size: "sticky" | "sidebar" | "inline" | "responsive"`, `className?: string`

2. Zaimplementowanie reklam na wszystkich stronach:
    - `/question/[slug]` → sticky footer + sidebar + inline ads co 5 pytań w sekcji related questions (mobile co 6 pytań)
    - `/technology/[slug]` → sticky footer + sidebar + inline ads w liście pytań
    - `/recent` → sticky footer + inline ads co 5 pytań (mobile co 6 pytań)

3. Responsywność i dark mode dla wszystkich reklam
4. Komentarze w kodzie dla każdej sekcji i wariantu
5. Logika inline ads:
```ts
// przykładowo w mapie pytań
questions.map((q, idx) => (
  <React.Fragment key={q.id}>
    <QuestionCard question={q} />
    {(idx + 1) % 5 === 0 && <AdComponent size="inline" />}
  </React.Fragment>
))

6. Jak używać:

import AdComponent from "../components/AdComponent";
<AdComponent size="sticky" />
<AdComponent size="sidebar" />
<AdComponent size="inline" />