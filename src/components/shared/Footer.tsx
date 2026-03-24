import Link from "next/link";

export default function Footer() {
  return (
    <footer className="no-print bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">
              idonthaveawill.com &middot; Made with care. Not a law firm.
            </p>
            <p className="text-xs text-gray-400 mt-1 max-w-lg">
              This tool generates a simple will document. It is not legal advice
              and we are not attorneys. For complex estates, consult an estate
              planning attorney.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
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
