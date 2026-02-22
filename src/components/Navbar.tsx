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
        <Link href="/" className="shrink-0 text-lg font-bold text-foreground">
          IT Interview Q&A
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
