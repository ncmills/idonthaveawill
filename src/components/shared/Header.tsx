"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <header className="no-print border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="idonthaveawill.com logo"
            width={28}
            height={28}
            className="shrink-0"
          />
          <span className="font-semibold text-lg text-[var(--color-brand)]">
            idonthaveawill<span className="text-[var(--color-accent)]">.com</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/will-requirements"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors hidden sm:block"
          >
            State Requirements
          </Link>
          <Link
            href="/estate-planning"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors hidden sm:block"
          >
            Estate Planning
          </Link>
          <Link
            href="/create"
            className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile hamburger */}
          <div className="relative sm:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
              aria-expanded={menuOpen}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
                <Link
                  href="/will-requirements"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  State Requirements
                </Link>
                <Link
                  href="/estate-planning"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Estate Planning
                </Link>
                <Link
                  href="/create"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-[var(--color-accent)] hover:bg-gray-50 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
