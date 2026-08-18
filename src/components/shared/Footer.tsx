import Link from "next/link";
import { NetworkFooter } from "@/components/NetworkFooter";

/**
 * Site footer — the calm end of a page about a subject nobody enjoys.
 *
 * 2026-08-18 footer pass. Three defects, all on the served bytes:
 *
 *  - The nav listed State Requirements / Estate Planning / Blog / Will Laws
 *    Report / Terms / Privacy and never once linked /create. The site's whole
 *    reason to exist was the one thing its footer would not take you to.
 *  - Legal sat inside the product nav at identical weight, so "Terms" read as a
 *    peer of "Estate Planning". It has its own bar now, where a reader looks.
 *  - The cross-site strip was 10px at rgba(0,0,0,0.25) — see NetworkFooter.
 *
 * The wordmark, the sage period, the italic "Made with care. Not a law firm."
 * and the self-help disclaimer are unchanged. They were already right.
 */

/* /review is deliberately absent: it renders the draft held in this browser's
   session, so a visitor arriving from the footer would land on an empty page. */
const START: { href: string; label: string }[] = [
  { href: "/will-requirements", label: "Will requirements by state" },
  { href: "/estate-planning", label: "Estate planning guides" },
];

const READ: { href: string; label: string }[] = [
  { href: "/blog", label: "Blog" },
  { href: "/data/2026-state-will-laws-report", label: "2026 State Will Laws Report" },
];

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-sage-deep)]">
        {title}
      </p>
      <ul className="mt-1 flex flex-col">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex min-h-[44px] items-center text-[13.5px] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="no-print bg-[var(--color-cream-deep)] border-t border-[var(--color-rule)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-[family-name:var(--font-display)] text-[19px] text-[var(--color-ink)] tracking-[-0.01em]">
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
            {/* The tool entry, in the site's own signature treatment — the same
                sage-underlined italic the header uses for "Begin a draft". A
                footer that never links the will builder is a footer that leaves
                every visitor who scrolled to the bottom with nowhere to go. */}
            <Link
              href="/create"
              className="mt-5 inline-flex min-h-[44px] items-center font-[family-name:var(--font-display)] italic text-[16px] text-[var(--color-ink)] underline decoration-[var(--color-sage)] decoration-[1.5px] underline-offset-[6px] hover:decoration-[var(--color-ink)] transition-colors"
            >
              Begin a draft
            </Link>
            <p className="mt-5 text-[12.5px] text-[var(--color-ink-soft)] leading-relaxed">
              This is a self-help document preparation tool, not legal advice.
              We are not attorneys. Have your draft reviewed by a licensed
              attorney before signing.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-14 gap-y-8">
            <Col title="Start here" links={START} />
            <Col title="Read" links={READ} />
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--color-rule)] pt-7">
          <NetworkFooter currentDomain="idonthaveawill.com" />
        </div>

        <div className="mt-8 border-t border-[var(--color-rule)] pt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-[var(--color-ink-soft)]">
            &copy; {new Date().getFullYear()} idonthaveawill.com
          </p>
          <div className="flex items-center gap-7 text-[12px]">
            <Link
              href="/privacy"
              className="inline-flex min-h-[44px] items-center text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="inline-flex min-h-[44px] items-center text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
