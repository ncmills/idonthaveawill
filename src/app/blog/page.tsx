import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Wills, Estate Planning, and State-Specific Guides",
  description:
    "Plain-English guides to writing a will, intestate succession, probate, and state-specific requirements. Free will drafting tool included.",
  alternates: { canonical: "https://idonthaveawill.com/blog" },
  openGraph: {
    title: "Blog — I Don't Have a Will",
    description:
      "Plain-English guides to writing a will, intestate succession, probate, and state-specific requirements.",
  },
};

export default function BlogIndex() {
  const generalPosts = BLOG_POSTS.filter((p) => p.category !== "State Law");
  const statePosts = BLOG_POSTS.filter((p) => p.category === "State Law").sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <p className="iha-caps">Folio</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-[34px] md:text-[44px] font-medium text-[var(--color-ink)] leading-tight tracking-[-0.01em]">
        Notes on wills and estate planning.
      </h1>
      <p className="mt-4 font-[family-name:var(--font-display)] italic text-[17px] text-[var(--color-ink-soft)] max-w-3xl leading-relaxed">
        Plain-English guides to writing a will, understanding intestate
        succession, navigating probate, and meeting state-specific requirements.
        Not legal advice &mdash; just the information most people need to get a
        valid will done.
      </p>

      <div className="iha-callout mt-8 max-w-3xl">
        <p>
          <strong>A reminder.</strong> This information is general reference only
          and is not legal advice. Laws change &mdash; always verify current
          requirements with a licensed attorney in your state.
        </p>
      </div>

      {/* General posts */}
      <p className="iha-caps mt-16">Fundamentals</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[24px] md:text-[30px] font-medium text-[var(--color-ink)] leading-tight">
        Wills, Planning, and Mistakes
      </h2>
      <p className="mt-2 font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-ink-soft)]">
        The fundamentals &mdash; who needs a will, how to write one, and what
        commonly goes wrong.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {generalPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-5 border border-[var(--color-rule)] bg-[var(--color-cream)] hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors group"
          >
            <div className="iha-caps text-[11px]">
              {post.category} &middot; {post.readTime}
            </div>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-[18px] font-medium text-[var(--color-ink)] group-hover:underline underline-offset-4 decoration-[var(--color-sage)]">
              {post.title}
            </h3>
            <p className="mt-2 text-[14px] text-[var(--color-ink-soft)] leading-relaxed">
              {post.description}
            </p>
          </Link>
        ))}
      </div>

      {/* State posts */}
      <p className="iha-caps mt-20">By state</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[24px] md:text-[30px] font-medium text-[var(--color-ink)] leading-tight">
        How to Write a Will in Every State
      </h2>
      <p className="mt-2 font-[family-name:var(--font-display)] italic text-[15px] text-[var(--color-ink-soft)]">
        State-specific guides covering requirements, witnesses, notarization,
        and signing rules for all 50 states + DC.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {statePosts.map((post) => {
          const match = post.title.match(/in (.+?) \(/);
          const stateName = match ? match[1] : post.title;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between p-4 border border-[var(--color-rule)] bg-[var(--color-cream)] hover:border-[var(--color-ink)] hover:bg-[var(--color-cream-deep)] transition-colors group"
            >
              <div>
                <span className="font-[family-name:var(--font-display)] text-[15px] font-medium text-[var(--color-ink)] group-hover:underline underline-offset-4 decoration-[var(--color-sage)]">
                  {stateName}
                </span>
                <span className="block iha-caps text-[10px] mt-1">
                  How to write a will
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-20 p-8 md:p-10 bg-[var(--color-cream-deep)] border border-[var(--color-rule)] text-center">
        <p className="iha-caps">Begin a draft</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-medium text-[var(--color-ink)]">
          Skip the reading. Start drafting.
        </h2>
        <p className="mt-3 font-[family-name:var(--font-display)] italic text-[16px] text-[var(--color-ink-soft)] max-w-xl mx-auto">
          Our free drafting tool walks you through the questions and generates
          a state-specific will in about ten minutes. No account, no cost,
          nothing stored.
        </p>
        <Link href="/create" className="iha-seal mt-6 inline-flex">
          <span className="iha-seal-mark" aria-hidden="true" />
          Start my free will
        </Link>
      </div>
    </div>
  );
}
