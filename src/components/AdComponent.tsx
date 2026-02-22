import { clsx } from "clsx";

type AdSize = "sticky" | "sidebar" | "inline" | "responsive";

export default function AdComponent({
  size,
  className,
}: {
  size: AdSize;
  className?: string;
}) {
  if (size === "sticky") {
    return (
      <div
        className={clsx(
          "fixed bottom-0 left-0 right-0 z-50 lg:hidden",
          className
        )}
      >
        <div className="bg-gray-200 dark:bg-gray-800 p-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Ad Placeholder
        </div>
      </div>
    );
  }

  if (size === "sidebar") {
    return (
      <aside className={clsx("hidden lg:block", className)}>
        <div className="sticky top-20">
          <div className="flex h-[600px] items-center justify-center bg-gray-200 p-4 text-center text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
            Ad Placeholder
          </div>
        </div>
      </aside>
    );
  }

  if (size === "inline") {
    return (
      <div className={clsx("my-4", className)}>
        <div className="bg-gray-200 p-4 text-center text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          Ad Placeholder
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("my-4", className)}>
      <div className="bg-gray-200 p-4 text-center text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
        Ad Placeholder
      </div>
    </div>
  );
}
