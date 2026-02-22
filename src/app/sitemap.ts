import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabaseClient";

const SITE_URL = "https://it-interview-questions.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [techResult, questionResult] = await Promise.all([
    supabase.from("technologies").select("slug"),
    supabase
      .from("questions")
      .select("slug, created_at")
      .eq("status", "approved"),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/recent`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/add-question`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const techPages: MetadataRoute.Sitemap = (techResult.data ?? []).map((t) => ({
    url: `${SITE_URL}/technology/${t.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const questionPages: MetadataRoute.Sitemap = (questionResult.data ?? []).map(
    (q) => ({
      url: `${SITE_URL}/question/${q.slug}`,
      lastModified: q.created_at,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...techPages, ...questionPages];
}
