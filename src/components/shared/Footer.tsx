import Link from "next/link";
import { NetworkFooter } from "@/components/NetworkFooter";

export default function Footer() {
  return (
    <footer className="no-print bg-[var(--color-cream-deep)] border-t border-[var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-md">
            <p className="font-[family-name:var(--font-display)] text-[18px] text-[var(--color-ink)] tracking-[-0.01em]">
              idonthaveawill
              <span
                className="text-[var(--color-sage)] font-semibold"
                style={{ fontSize: "1.3em", lineHeight: 0 }}
                aria-hidden="true"
              >
                .
              </span>
              <span className="sr-only">.</span>
              com
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] italic text-[14px] text-[var(--color-ink-soft)]">
              Made with care. Not a law firm.
            </p>
            <p className="mt-3 text-[12.5px] text-[var(--color-ink-soft)] leading-relaxed">
              This is a self-help document preparation tool, not legal advice.
              We are not attorneys. Have your draft reviewed by a licensed
              attorney before signing.
            </p>
          </div>
          <nav className="flex gap-x-6 gap-y-2 text-[13px] text-[var(--color-ink-soft)] flex-wrap">
            <Link href="/will-requirements" className="hover:text-[var(--color-ink)] transition-colors">
              State Requirements
            </Link>
            <Link href="/estate-planning" className="hover:text-[var(--color-ink)] transition-colors">
              Estate Planning
            </Link>
            <Link href="/blog" className="hover:text-[var(--color-ink)] transition-colors">
              Blog
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-ink)] transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-ink)] transition-colors">
              Privacy
            </Link>
          </nav>
        </div>
        <NetworkFooter currentDomain="idonthaveawill.com" />
      </div>
    </footer>
  );
}
