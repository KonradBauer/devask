"use client";

import { useSyncExternalStore, useCallback } from "react";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

const THEME_EVENT = "theme-change";

function getSnapshot(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return (document.documentElement.getAttribute("data-theme") as "dark" | "light") ?? "dark";
}

function getServerSnapshot(): "dark" | "light" {
  return "dark";
}

function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
    window.dispatchEvent(new CustomEvent(THEME_EVENT));
  }, [theme]);

  return (
    <button
      onClick={toggle}
      className="rounded-lg p-1.5 text-muted transition-colors hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <HiOutlineSun className="h-5 w-5" />
      ) : (
        <HiOutlineMoon className="h-5 w-5" />
      )}
    </button>
  );
}
