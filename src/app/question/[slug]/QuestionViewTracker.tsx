"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function QuestionViewTracker({
  slug,
  technology,
}: {
  slug: string;
  technology: string;
}) {
  useEffect(() => {
    trackEvent("question_view", { slug, technology });
  }, [slug, technology]);

  return null;
}
