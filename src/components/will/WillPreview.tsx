import type { GeneratedWill } from "@/lib/types";

interface Props {
  will: GeneratedWill;
}

export default function WillPreview({ will }: Props) {
  return (
    <div className="will-document bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-12 font-serif">
      <p className="text-xs text-gray-400 italic mb-6 no-print">
        This document was prepared using idonthaveawill.com and does not
        constitute legal advice. Consult an attorney for complex estate planning
        needs.
      </p>

      <h1 className="text-xl font-bold text-center mb-8 tracking-wide">
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
        <div className="mt-10 pt-10 border-t border-gray-300">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {will.selfProvingAffidavit}
          </div>
        </div>
      )}

      {will.notarialAttestation && (
        <div className="mt-10 pt-10 border-t border-gray-300">
          <div className="whitespace-pre-wrap font-mono text-sm">
            {will.notarialAttestation}
          </div>
        </div>
      )}
    </div>
  );
}
