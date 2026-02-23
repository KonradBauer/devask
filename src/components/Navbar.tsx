"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX, HiOutlineSearch } from "react-icons/hi";
import { HiOutlinePlus } from "react-icons/hi2";
import { dict } from "@/lib/i18n";
import SearchBar from "./SearchBar";

const t = dict.pl;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/recent", label: t.nav.recent },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform group-hover:scale-105"
          >
            <rect x="2" y="2" width="28" height="28" rx="8" className="fill-primary" />
            <path
              d="M10 12.5C10 11.12 11.12 10 12.5 10H16C18.21 10 20 11.79 20 14C20 15.86 18.72 17.42 17 17.87V18H15V16H16C17.1 16 18 15.1 18 14C18 12.9 17.1 12 16 12H12.5C12.22 12 12 12.22 12 12.5V19.5C12 19.78 12.22 20 12.5 20H14V22H12.5C11.12 22 10 20.88 10 19.5V12.5Z"
              className="fill-white"
            />
            <circle cx="21" cy="21" r="2" className="fill-white/80" />
          </svg>
          <span className="text-lg font-bold text-foreground">DevAsk</span>
        </Link>

        {mobileSearch ? (
          <div className="flex flex-1 items-center gap-2 md:hidden">
            <div className="flex-1">
              <SearchBar strings={t.search} lang="pl" />
            </div>
            <button
              onClick={() => setMobileSearch(false)}
              className="text-muted"
              aria-label="Zamknij wyszukiwanie"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            <div className="hidden flex-1 items-center justify-end gap-4 md:flex">
              <SearchBar strings={t.search} lang="pl" />
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/add-question"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
              >
                <HiOutlinePlus className="h-4 w-4" />
                {t.nav.addQuestion}
              </Link>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileSearch(true)}
                className="text-muted"
                aria-label="Szukaj"
              >
                <HiOutlineSearch className="h-5 w-5" />
              </button>
              <button
                onClick={() => setOpen(!open)}
                className="text-muted"
                aria-label="Menu"
              >
                {open ? (
                  <HiOutlineX className="h-6 w-6" />
                ) : (
                  <HiOutlineMenu className="h-6 w-6" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {open && !mobileSearch && (
        <div className="border-t border-border md:hidden">
          <div className="flex flex-col gap-2 px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-card hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/add-question"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              <HiOutlinePlus className="h-4 w-4" />
              {t.nav.addQuestion}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
