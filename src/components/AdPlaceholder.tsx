import { clsx } from "clsx";

export default function AdPlaceholder({
  className,
  label = "Advertisement",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-xl border border-dashed border-border bg-card/50 text-xs text-muted",
        className
      )}
    >
      {label}
    </div>
  );
}
