export default function QuestionCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="h-5 w-14 rounded-full bg-card-hover" />
        <div className="h-4 w-20 rounded bg-card-hover" />
      </div>
      <div className="h-4 w-3/4 rounded bg-card-hover" />
      <div className="h-3 w-24 rounded bg-card-hover" />
    </div>
  );
}
