export type Lang = "en" | "pl";

export type SortLabels = {
  newest: string;
  mostAsked: string;
  difficulty: string;
};

export type QuestionStrings = {
  answer: string;
  reported: string;
  gotThis: string;
  reportTitle: string;
  company: string;
  level: string;
  country: string;
  submitting: string;
  submit: string;
  cancel: string;
  thanks: string;
};

export type AddQuestionStrings = {
  title: string;
  subtitle: string;
  technology: string;
  selectTechnology: string;
  question: string;
  questionPlaceholder: string;
  answer: string;
  answerPlaceholder: string;
  difficulty: string;
  junior: string;
  mid: string;
  senior: string;
  company: string;
  companyPlaceholder: string;
  country: string;
  countryPlaceholder: string;
  level: string;
  levelPlaceholder: string;
  submitting: string;
  submit: string;
  success: string;
};

export type SearchStrings = {
  placeholder: string;
  company: string;
};

function plQ(n: number): string {
  if (n === 1) return "pytanie";
  if (n % 100 >= 12 && n % 100 <= 14) return "pytań";
  const r = n % 10;
  if (r >= 2 && r <= 4) return "pytania";
  return "pytań";
}

export const dict = {
  en: {
    nav: {
      home: "Home",
      recent: "Recent",
      about: "About",
      addQuestion: "Add Question",
    },
    langSwitch: "PL",
    home: {
      headline: "Real IT Interview Questions",
      subtitle:
        "Browse hundreds of questions asked in real interviews. Filter by technology, report questions you got, and contribute your own.",
      technologies: "Technologies",
      mostAsked: "Most Asked",
      recentlyAdded: "Recently Added",
      viewAll: "View all",
    },
    technologyCard: (n: number) => `${n} question${n !== 1 ? "s" : ""}`,
    technology: {
      heading: (name: string) => `${name} Interview Questions`,
      count: (n: number) => `${n} question${n !== 1 ? "s" : ""} available`,
      noQuestions: (name: string) =>
        `No questions yet for ${name}. Be the first to add one!`,
      more: (name: string) => `More ${name} Questions`,
    },
    sort: {
      newest: "Newest",
      mostAsked: "Most Asked",
      difficulty: "Difficulty",
    },
    question: {
      answer: "Answer",
      reported: "reported",
      gotThis: "I got this question in an interview",
      reportTitle: "Report this question",
      company: "Company (e.g. Google)",
      level: "Level (e.g. Senior, L5)",
      country: "Country (e.g. USA)",
      submitting: "Submitting...",
      submit: "Submit Report",
      cancel: "Cancel",
      thanks: "Thanks for reporting! Your data helps others prepare.",
    } satisfies QuestionStrings,
    recent: {
      title: "Recently Added Questions",
      subtitle: "The latest questions submitted by the community.",
      empty: "No questions yet. Be the first to add one!",
    },
    addQuestion: {
      title: "Submit a Question",
      subtitle:
        "Share an interview question you encountered. It will be reviewed before appearing publicly.",
      technology: "Technology *",
      selectTechnology: "Select technology",
      question: "Question *",
      questionPlaceholder:
        "e.g. What is the difference between useEffect and useLayoutEffect?",
      answer: "Answer *",
      answerPlaceholder: "Provide a detailed answer...",
      difficulty: "Difficulty *",
      junior: "Junior",
      mid: "Mid",
      senior: "Senior",
      company: "Company",
      companyPlaceholder: "e.g. Google",
      country: "Country",
      countryPlaceholder: "e.g. USA",
      level: "Level",
      levelPlaceholder: "e.g. L5, Senior, Staff",
      submitting: "Submitting...",
      submit: "Submit Question",
      success: "Question submitted for review!",
    } satisfies AddQuestionStrings,
    footer: {
      copy: (year: number) =>
        `© ${year} IT Interview Questions. Open-source project.`,
      about: "About",
      recent: "Recent",
      addQuestion: "Add Question",
    },
    search: {
      placeholder: "Search questions...",
      company: "Company",
    } satisfies SearchStrings,
    about: {
      title: "About IT Interview Questions",
      intro:
        "IT Interview Questions is a free, open platform where developers share real interview questions they encountered. No login required — just browse, learn, and contribute.",
      howItWorks: "How it works",
      howItWorksList: [
        "Browse questions by technology (React, JavaScript, Python, Java, System Design, and more)",
        'Sort by difficulty, popularity, or recency',
        'Click "I got this question" to report that you were asked it in an interview',
        "Submit your own questions to help others prepare",
      ],
      whyExists: "Why this exists",
      whyExistsText:
        "Interview prep shouldn't be locked behind paywalls. This project aims to create a community-driven, freely accessible collection of real interview questions with quality answers.",
      contributing: "Contributing",
      contributingText:
        "Anyone can submit a question. Submitted questions are reviewed before being published. All data is anonymous — no accounts needed.",
      techStack: "Tech stack",
      techStackText:
        "Built with Next.js, TailwindCSS, and Supabase. Deployed on Vercel.",
    },
  },
  pl: {
    nav: {
      home: "Strona główna",
      recent: "Najnowsze",
      about: "O projekcie",
      addQuestion: "Dodaj pytanie",
    },
    langSwitch: "EN",
    home: {
      headline: "Prawdziwe pytania rekrutacyjne IT",
      subtitle:
        "Przeglądaj setki pytań zadawanych na prawdziwych rozmowach. Filtruj według technologii, zgłaszaj pytania i dodawaj własne.",
      technologies: "Technologie",
      mostAsked: "Najczęściej zadawane",
      recentlyAdded: "Ostatnio dodane",
      viewAll: "Zobacz wszystkie",
    },
    technologyCard: (n: number) => `${n} ${plQ(n)}`,
    technology: {
      heading: (name: string) => `Pytania rekrutacyjne — ${name}`,
      count: (n: number) => `${n} ${plQ(n)} dostępnych`,
      noQuestions: (name: string) =>
        `Brak pytań dla ${name}. Bądź pierwszy i dodaj pytanie!`,
      more: (name: string) => `Więcej pytań z ${name}`,
    },
    sort: {
      newest: "Najnowsze",
      mostAsked: "Najczęściej zadawane",
      difficulty: "Trudność",
    },
    question: {
      answer: "Odpowiedź",
      reported: "zgłoszeń",
      gotThis: "Dostałem to pytanie na rozmowie kwalifikacyjnej",
      reportTitle: "Zgłoś pytanie",
      company: "Firma (np. Google)",
      level: "Poziom (np. Senior, L5)",
      country: "Kraj (np. Polska)",
      submitting: "Wysyłanie...",
      submit: "Wyślij zgłoszenie",
      cancel: "Anuluj",
      thanks: "Dziękujemy za zgłoszenie! Twoje dane pomagają innym.",
    } satisfies QuestionStrings,
    recent: {
      title: "Ostatnio dodane pytania",
      subtitle: "Najnowsze pytania dodane przez społeczność.",
      empty: "Brak pytań. Bądź pierwszy i dodaj pytanie!",
    },
    addQuestion: {
      title: "Dodaj pytanie",
      subtitle:
        "Podziel się pytaniem rekrutacyjnym, które napotkałeś. Zostanie ono zweryfikowane przed opublikowaniem.",
      technology: "Technologia *",
      selectTechnology: "Wybierz technologię",
      question: "Pytanie *",
      questionPlaceholder:
        "np. Jaka jest różnica między useEffect a useLayoutEffect?",
      answer: "Odpowiedź *",
      answerPlaceholder: "Podaj szczegółową odpowiedź...",
      difficulty: "Poziom trudności *",
      junior: "Junior",
      mid: "Mid",
      senior: "Senior",
      company: "Firma",
      companyPlaceholder: "np. Google",
      country: "Kraj",
      countryPlaceholder: "np. Polska",
      level: "Poziom",
      levelPlaceholder: "np. L5, Senior, Staff",
      submitting: "Wysyłanie...",
      submit: "Dodaj pytanie",
      success: "Pytanie zostało zgłoszone do weryfikacji!",
    } satisfies AddQuestionStrings,
    footer: {
      copy: (year: number) =>
        `© ${year} IT Interview Questions. Projekt open-source.`,
      about: "O projekcie",
      recent: "Najnowsze",
      addQuestion: "Dodaj pytanie",
    },
    search: {
      placeholder: "Szukaj pytań...",
      company: "Firma",
    } satisfies SearchStrings,
    about: {
      title: "O IT Interview Questions",
      intro:
        "IT Interview Questions to darmowa, otwarta platforma, na której programiści dzielą się prawdziwymi pytaniami rekrutacyjnymi. Żadnego logowania — przeglądaj, ucz się i dodawaj pytania.",
      howItWorks: "Jak to działa",
      howItWorksList: [
        "Przeglądaj pytania według technologii (React, JavaScript, Python, Java, System Design i więcej)",
        "Sortuj według trudności, popularności lub daty dodania",
        'Kliknij „Dostałem to pytanie" aby zgłosić, że pojawiło się na Twojej rozmowie',
        "Dodawaj własne pytania, aby pomóc innym w przygotowaniach",
      ],
      whyExists: "Dlaczego ten projekt istnieje",
      whyExistsText:
        "Przygotowanie do rekrutacji nie powinno być dostępne tylko za paywallem. Ten projekt tworzony jest przez społeczność i oferuje zbiór prawdziwych pytań rekrutacyjnych z rzetelnymi odpowiedziami.",
      contributing: "Jak dołożyć się",
      contributingText:
        "Każdy może dodać pytanie. Zgłoszone pytania są weryfikowane przed publikacją. Wszystkie dane są anonimowe — żadnych kont.",
      techStack: "Stack technologiczny",
      techStackText:
        "Zbudowany z Next.js, TailwindCSS i Supabase. Wdrożony na Vercel.",
    },
  },
};

export function getLang(): Lang {
  return "pl";
}
