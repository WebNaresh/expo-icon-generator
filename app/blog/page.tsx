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

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: "complete-guide-expo-icon-generation",
    title: "The Complete Guide to Expo Icon Generation in 2024",
    description:
      "Master the art of creating perfect icons for your Expo React Native apps. Learn about sizing, formats, optimization techniques, and platform-specific requirements.",
    content: "",
    author: "Naresh Bhosale",
    publishedAt: "2024-01-15",
    readTime: "12 min read",
    category: "Tutorial",
    tags: ["expo", "react-native", "icons", "mobile-development"],
    featured: true,
  },
  {
    slug: "ios-android-icon-requirements-2024",
    title: "iOS vs Android Icon Requirements: What You Need to Know",
    description:
      "Comprehensive breakdown of icon specifications for iOS App Store and Google Play Store. Includes adaptive icons, sizing guidelines, and submission requirements.",
    content: "",
    author: "Naresh Bhosale",
    publishedAt: "2024-01-10",
    readTime: "8 min read",
    category: "Guide",
    tags: ["ios", "android", "app-store", "guidelines"],
    featured: true,
  },
  {
    slug: "icon-design-best-practices",
    title: "Icon Design Best Practices for Mobile Apps",
    description:
      "Learn the fundamental principles of effective icon design. Discover color theory, typography, visual hierarchy, and accessibility considerations for mobile applications.",
    content: "",
    author: "Naresh Bhosale",
    publishedAt: "2024-01-05",
    readTime: "10 min read",
    category: "Design",
    tags: ["design", "ui-ux", "accessibility", "branding"],
    featured: false,
  },
  {
    slug: "automated-icon-generation-workflow",
    title: "Building an Automated Icon Generation Workflow",
    description:
      "Streamline your development process with automated icon generation. Learn about CI/CD integration, batch processing, and maintaining consistency across platforms.",
    content: "",
    author: "Naresh Bhosale",
    publishedAt: "2023-12-28",
    readTime: "15 min read",
    category: "Development",
    tags: ["automation", "ci-cd", "workflow", "productivity"],
    featured: false,
  },
  {
    slug: "app-store-optimization-icons",
    title: "App Store Optimization: How Icons Impact Downloads",
    description:
      "Discover how your app icon affects discoverability and download rates. Learn ASO strategies, A/B testing methods, and conversion optimization techniques.",
    content: "",
    author: "Naresh Bhosale",
    publishedAt: "2023-12-20",
    readTime: "9 min read",
    category: "Marketing",
    tags: ["aso", "marketing", "conversion", "analytics"],
    featured: false,
  },
  {
    slug: "react-native-icon-performance",
    title: "Optimizing Icon Performance in React Native Apps",
    description:
      "Learn how to optimize icon loading, reduce bundle size, and improve app performance. Covers vector icons, caching strategies, and memory management.",
    content: "",
    author: "Naresh Bhosale",
    publishedAt: "2023-12-15",
    readTime: "11 min read",
    category: "Performance",
    tags: ["performance", "optimization", "react-native", "bundle-size"],
    featured: false,
  },
];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Icon Generation Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Expert guides, tutorials, and insights for creating perfect icons
            for your mobile applications. Learn from real-world examples and
            industry best practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-500" />
              Expert Tutorials
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              Updated Weekly
            </span>
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              Industry Insights
            </span>
          </div>
        </div>

        {/* Featured Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                      <span>•</span>
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs"
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
                      className="text-blue-600 hover:text-blue-700 font-medium"
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
        <section className="mt-16 bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Icon Generation Tips
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest tutorials, best practices, and industry insights
            delivered to your inbox. Join thousands of developers improving
            their app icon game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
