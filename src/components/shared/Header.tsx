import Link from "next/link";
import Image from "next/image";

export default function Header() {
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
        </div>
      </div>
    </header>
  );
}
