import { ImageResponse } from "next/og";
import { supabase } from "@/lib/supabaseClient";

export const runtime = "edge";
export const alt = "DevAsk Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: tech } = await supabase
    .from("technologies")
    .select("name, question_count")
    .eq("slug", slug)
    .single();

  const name = tech?.name ?? slug;
  const count = tech?.question_count ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 100%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#a1a1aa",
          }}
        >
          {count} pytań rekrutacyjnych
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            color: "#6366f1",
          }}
        >
          DevAsk
        </div>
      </div>
    ),
    { ...size }
  );
}
