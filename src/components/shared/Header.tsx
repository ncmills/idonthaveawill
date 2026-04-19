"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className="no-print bg-[var(--color-cream)] border-b border-[var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group" aria-label="idonthaveawill.com — home">
          <span className="font-[family-name:var(--font-display)] text-[21px] md:text-[22px] font-medium text-[var(--color-ink)] tracking-[-0.01em] leading-none">
            idonthaveawill
            <span
              className="inline-block text-[var(--color-sage)] font-semibold"
              style={{ fontSize: "1.3em", lineHeight: 0, verticalAlign: "baseline" }}
              aria-hidden="true"
            >
              .
            </span>
            <span className="sr-only">.</span>
            com
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <Link
            href="/will-requirements"
            className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors hidden sm:block"
          >
            State Requirements
          </Link>
          <Link
            href="/estate-planning"
            className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors hidden sm:block"
          >
            Estate Planning
          </Link>
          <Link
            href="/blog"
            className="text-[13px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors hidden sm:block"
          >
            Blog
          </Link>
          <Link
            href="/create"
            className="font-[family-name:var(--font-display)] italic text-[14px] text-[var(--color-ink)] underline decoration-[var(--color-sage)] decoration-[1.5px] underline-offset-[5px] hover:decoration-[var(--color-ink)] transition-colors"
          >
            Begin a draft
          </Link>

          {/* Mobile hamburger */}
          <div className="relative sm:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-[var(--color-cream)] border border-[var(--color-rule)] shadow-lg py-2 z-50">
                <Link
                  href="/will-requirements"
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 text-[14px] text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors"
                >
                  State Requirements
                </Link>
                <Link
                  href="/estate-planning"
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 text-[14px] text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors"
                >
                  Estate Planning
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 text-[14px] text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/create"
                  onClick={() => setMenuOpen(false)}
                  className="block px-5 py-3 font-[family-name:var(--font-display)] italic text-[14px] text-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors"
                >
                  Begin a draft
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
