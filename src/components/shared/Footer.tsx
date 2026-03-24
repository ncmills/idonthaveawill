import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="no-print bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-3">
            <Image
              src="/logo.svg"
              alt="idonthaveawill.com logo"
              width={24}
              height={24}
              className="shrink-0 mt-0.5"
            />
            <div>
              <p className="text-sm text-gray-500">
                idonthaveawill.com &middot; Made with care. Not a law firm.
              </p>
              <p className="text-xs text-gray-400 mt-1 max-w-lg">
                This is a self-help document preparation tool, not legal advice.
                We are not attorneys. Have your draft reviewed by a licensed
                attorney before signing.
              </p>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/will-requirements" className="hover:text-gray-700 transition-colors">
              State Requirements
            </Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
