import type { GeneratedWill } from "@/lib/types";

interface Props {
  will: GeneratedWill;
}

export default function WillPreview({ will }: Props) {
  return (
    <div className="relative">
      {/* Paper-on-paper shadow */}
      <div
        aria-hidden="true"
        className="absolute -inset-2 bg-[var(--color-cream-deep)] translate-x-2 translate-y-3 no-print"
      />

      <article
        className="relative will-document bg-white border border-[var(--color-rule)] p-6 sm:p-10 md:p-14"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <p className="text-[11px] tracking-[0.22em] uppercase text-[var(--color-ink-soft)] mb-10 no-print">
          Prepared by idonthaveawill.com · Draft · Not legal advice
        </p>

        <h1 className="text-xl md:text-2xl font-bold text-center mb-10 tracking-wide">
          {will.title}
        </h1>

        <p className="mb-6 leading-relaxed">{will.preamble}</p>

        {will.articles.map((article, i) => (
          <div key={i} className="mb-6">
            <h2 className="font-bold text-sm tracking-wide mb-2 uppercase">
              {article.heading}
            </h2>
            <p className="leading-relaxed whitespace-pre-wrap">{article.content}</p>
          </div>
        ))}

        <div className="mt-10 mb-6">
          <p className="leading-relaxed whitespace-pre-wrap">{will.testimonium}</p>
        </div>

        <div className="whitespace-pre-wrap font-mono text-sm">
          {will.signatureBlock}
        </div>

        {will.witnessBlock && (
          <div className="mt-10 whitespace-pre-wrap font-mono text-sm">
            {will.witnessBlock}
          </div>
        )}

        {will.selfProvingAffidavit && (
          <div className="mt-10 pt-10 border-t border-[var(--color-rule)]">
            <div className="whitespace-pre-wrap font-mono text-sm">
              {will.selfProvingAffidavit}
            </div>
          </div>
        )}

        {will.notarialAttestation && (
          <div className="mt-10 pt-10 border-t border-[var(--color-rule)]">
            <div className="whitespace-pre-wrap font-mono text-sm">
              {will.notarialAttestation}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
