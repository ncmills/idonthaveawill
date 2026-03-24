export default function Disclaimer() {
  return (
    <section className="py-12 bg-amber-50 border-y border-amber-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
          <svg
            className="w-6 h-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p className="text-amber-800 leading-relaxed">
          This tool generates a simple will document. It is not legal advice and
          we are not attorneys. For complex estates, blended families, business
          interests, or trusts, please consult an estate planning attorney.
        </p>
      </div>
    </section>
  );
}
