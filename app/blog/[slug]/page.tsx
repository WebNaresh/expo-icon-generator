import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, Tag, Share2 } from "lucide-react";

import { blogPosts, type BlogPost } from "../../_data/blog-posts";

const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  return blogPosts.find((post) => post.slug === slug) || null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    alternates: {
      canonical: `/blog/${slug}`,
    },
    title: `${post.title} | Expo Icon Generator Blog`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Back Navigation */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-medium text-sky-400 hover:text-sky-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-sky-400">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
            {post.title}
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-gray-400">
            {post.description}
          </p>

          <div className="flex items-center justify-between border-y border-gray-700 py-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <User className="h-5 w-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            <button className="flex items-center gap-2 text-gray-400 transition-colors hover:text-sky-400">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg prose-invert max-w-none">
          <div
            className="leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n/g, "<br />")
                .replace(/#{1,6}\s/g, (match) => {
                  const level = match.trim().length;
                  return `<h${level} class="text-${
                    4 - level
                  }xl font-bold text-white mt-8 mb-4">`;
                })
                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </article>

        {/* Tags */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <h3 className="mb-4 text-lg font-semibold text-white">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full bg-gray-800 px-3 py-1 text-sm font-medium text-sky-400 transition-colors hover:bg-gray-700"
              >
                <Tag className="mr-1 inline h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Ready to Generate Perfect Icons?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-400">
            Put these techniques into practice with our automated icon
            generation tool. Create platform-specific icons from a single source
            image in seconds.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            Try Icon Generator
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
