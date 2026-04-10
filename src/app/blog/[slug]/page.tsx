import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/lib/blog-posts";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://idonthaveawill.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://idonthaveawill.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "I Don't Have a Will",
      url: "https://idonthaveawill.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://idonthaveawill.com/blog/${post.slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://idonthaveawill.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://idonthaveawill.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://idonthaveawill.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-gray-700 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600">{post.title}</span>
      </nav>

      <header className="mb-8">
        <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
          {post.category} &middot; {post.readTime} &middot; {formatDate(post.date)}
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-serif)] text-3xl md:text-4xl font-bold text-[var(--color-brand)] leading-tight">
          {post.title}
        </h1>
      </header>

      <div
        className="blog-content text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* CTA */}
      <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200 text-center">
        <h2 className="text-xl font-bold text-[var(--color-brand)]">
          Start your free will now
        </h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
          Walks you through the questions, generates a state-specific will, and
          gives you signing instructions. About 10 minutes, no account, no cost.
        </p>
        <Link
          href="/create"
          className="inline-block mt-5 px-6 py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold transition-colors"
        >
          Start my free will &rarr;
        </Link>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-lg font-bold text-[var(--color-brand)] mb-4">Related Reading</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="p-4 rounded-xl border border-gray-200 hover:border-[var(--color-accent)] hover:bg-green-50/40 transition-all group"
              >
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">
                  {r.category} &middot; {r.readTime}
                </div>
                <h3 className="mt-2 text-sm font-semibold text-[var(--color-brand)] group-hover:text-[var(--color-accent)]">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Blog-content typography */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .blog-content p.lead { font-size: 1rem; color: #6b7280; font-style: italic; padding: 0.75rem 1rem; background: #fffbeb; border-left: 3px solid #fde68a; border-radius: 6px; margin-bottom: 1.5rem; }
          .blog-content h2 { font-family: var(--font-serif), serif; font-size: 1.5rem; color: var(--color-brand); margin-top: 2.25rem; margin-bottom: 0.75rem; font-weight: 700; }
          .blog-content h3 { font-size: 1.125rem; color: var(--color-brand); margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 600; }
          .blog-content p { margin-bottom: 1rem; color: #4b5563; line-height: 1.75; }
          .blog-content ul, .blog-content ol { margin-bottom: 1rem; padding-left: 1.5rem; color: #4b5563; }
          .blog-content ul { list-style: disc; }
          .blog-content ol { list-style: decimal; }
          .blog-content li { margin-bottom: 0.4rem; line-height: 1.7; }
          .blog-content a { color: var(--color-accent); text-decoration: underline; text-underline-offset: 2px; }
          .blog-content a:hover { color: var(--color-accent-hover); }
          .blog-content strong { color: var(--color-brand); font-weight: 600; }
          .blog-content em { font-style: italic; }
        `,
        }}
      />
    </article>
  );
}
