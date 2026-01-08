import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Icon Generation Guides & Tutorials",
  description:
    "Comprehensive guides, tutorials, and best practices for icon generation, mobile app development, and Expo React Native apps. Learn from expert insights and real-world examples.",
  keywords: [
    "icon generation",
    "mobile app development",
    "expo tutorials",
    "react native icons",
    "app store optimization",
    "icon design",
    "mobile UI/UX",
    "app development guides",
  ],
  openGraph: {
    title: "Blog - Icon Generation Guides & Tutorials",
    description:
      "Expert guides and tutorials for icon generation and mobile app development",
    type: "website",
  },
};

import { blogPosts } from "../_data/blog-posts";

const categories = [
  "All",
  "Tutorial",
  "Guide",
  "Design",
  "Development",
  "Marketing",
  "Performance",
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Icon Generation Blog
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Expert guides, tutorials, and insights for creating perfect icons
            for your mobile applications. Learn from real-world examples and
            industry best practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-blue-500" />
              Expert Tutorials
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              Updated Weekly
            </span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-500" />
              Industry Insights
            </span>
          </div>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Featured Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="mb-8 text-3xl font-bold text-gray-900">
            Recent Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors hover:text-blue-600">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {post.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 rounded-xl bg-white p-8 text-center shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            Stay Updated with Icon Generation Tips
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-600">
            Get the latest tutorials, best practices, and industry insights
            delivered to your inbox. Join thousands of developers improving
            their app icon game.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
