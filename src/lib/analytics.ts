type EventName =
  | "question_view"
  | "technology_open"
  | "question_added"
  | "interview_marked";

type EventData = Record<string, string | number | boolean>;

export function trackEvent(name: EventName, data?: EventData) {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log(`[analytics] ${name}`, data);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, data);
  }
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
