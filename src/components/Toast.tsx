"use client";

import { useToast } from "@/lib/ToastContext";
import { clsx } from "clsx";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className={clsx(
            "animate-slide-in cursor-pointer rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all",
            toast.type === "success" && "bg-success text-white",
            toast.type === "error" && "bg-danger text-white"
          )}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
