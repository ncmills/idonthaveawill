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
  // Split into general posts (hand-written) and state posts
  const generalPosts = BLOG_POSTS.filter((p) => p.category !== "State Law");
  const statePosts = BLOG_POSTS.filter((p) => p.category === "State Law").sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-[var(--color-brand)]">
        Blog
      </h1>
      <p className="mt-4 text-gray-600 max-w-3xl leading-relaxed">
        Plain-English guides to writing a will, understanding intestate
        succession, navigating probate, and meeting state-specific requirements.
        Not legal advice &mdash; just the information most people need to get a
        valid will done.
      </p>

      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        This information is general reference only and is not legal advice.
        Laws change &mdash; always verify current requirements with a licensed
        attorney in your state.
      </div>

      {/* General posts */}
      <h2 className="mt-12 text-2xl font-bold text-[var(--color-brand)]">
        Wills, Planning, and Mistakes
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        The fundamentals &mdash; who needs a will, how to write one, and what
        commonly goes wrong.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {generalPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="p-5 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50/40 transition-all group"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
              {post.category} &middot; {post.readTime}
            </div>
            <h3 className="mt-2 font-bold text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {post.description}
            </p>
          </Link>
        ))}
      </div>

      {/* State posts */}
      <h2 className="mt-16 text-2xl font-bold text-[var(--color-brand)]">
        How to Write a Will in Every State
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        State-specific guides covering requirements, witnesses, notarization,
        and signing rules for all 50 states + DC.
      </p>
      <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {statePosts.map((post) => {
          // Extract state name from title "How to Write a Will in [State] (2026 Guide)"
          const match = post.title.match(/in (.+?) \(/);
          const stateName = match ? match[1] : post.title;
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50 transition-all group"
            >
              <div>
                <span className="font-medium text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
                  {stateName}
                </span>
                <span className="block text-xs text-gray-400 mt-0.5">
                  How to write a will
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
        <h2 className="text-xl font-bold text-[var(--color-brand)]">
          Skip the reading. Start drafting.
        </h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Our free drafting tool walks you through the questions and generates
          a state-specific will in about ten minutes. No account, no cost,
          nothing stored.
        </p>
        <Link
          href="/create"
          className="inline-block mt-5 px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold transition-colors"
        >
          Start my free will &rarr;
        </Link>
      </div>
    </div>
  );
}
