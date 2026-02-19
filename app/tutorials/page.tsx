import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowRight,
  Code,
  Smartphone,
  Palette,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/tutorials",
  },
  title: "Tutorials - Learn App Development & Icon Design",
  description:
    "Step-by-step tutorials for mobile app development, icon design, and Expo React Native. From beginner to advanced, learn with practical examples and real-world projects.",
  keywords: [
    "app development tutorials",
    "react native tutorials",
    "expo tutorials",
    "icon design tutorials",
    "mobile development",
    "app store optimization",
    "ui ux design",
    "mobile app icons",
  ],
  openGraph: {
    title: "Tutorials - Learn App Development & Icon Design",
    description:
      "Comprehensive tutorials for mobile app development and icon design",
    type: "website",
  },
};

import { tutorials } from "../_data/tutorials";

const categories = [
  "All",
  "Development",
  "Design",
  "Performance",
  "Publishing",
  "DevOps",
];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function TutorialsPage() {
  const featuredTutorials = tutorials.filter((tutorial) => tutorial.featured);
  const allTutorials = tutorials.filter((tutorial) => !tutorial.featured);

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            Learn App Development
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-400">
            Master mobile app development and icon design with our comprehensive
            tutorials. From beginner-friendly guides to advanced optimization
            techniques.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <span className="font-medium">6 In-depth Tutorials</span>
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-sky-400" />
              <span className="font-medium">Open Source</span>
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Free Forever</span>
            </span>
          </div>
        </div>

        {/* Featured Tutorials */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Featured Tutorials
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {featuredTutorials.map((tutorial) => (
              <article
                key={tutorial.slug}
                className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        tutorial.difficulty === "Beginner"
                          ? "bg-green-900/50 text-green-400"
                          : tutorial.difficulty === "Intermediate"
                          ? "bg-yellow-900/50 text-yellow-400"
                          : "bg-red-900/50 text-red-400"
                      }`}
                    >
                      {tutorial.difficulty}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span className="text-sm font-medium text-gray-400">
                        {tutorial.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-white transition-colors hover:text-sky-400">
                    <Link href={`/tutorials/${tutorial.slug}`}>
                      {tutorial.title}
                    </Link>
                  </h3>

                  <p className="mb-4 text-sm leading-relaxed text-gray-400">
                    {tutorial.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {tutorial.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded bg-gray-800 px-2 py-1 text-xs text-sky-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tutorial.students.toLocaleString()} students
                    </span>
                  </div>

                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 font-medium text-gray-900 transition-colors hover:bg-gray-200"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-white">
            Learning Paths
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-gray-800 p-2">
                  <Code className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  App Development
                </h3>
              </div>
              <p className="mb-4 text-gray-400">
                Learn React Native and Expo from basics to advanced concepts.
                Build real-world applications.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-gray-400">
                <li>• React Native Fundamentals</li>
                <li>• Expo CLI and Tools</li>
                <li>• Navigation and State Management</li>
                <li>• API Integration</li>
                <li>• App Store Deployment</li>
              </ul>
              <Link
                href="/tutorials?category=Development"
                className="font-medium text-sky-400 hover:text-sky-300"
              >
                View Path →
              </Link>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-gray-800 p-2">
                  <Palette className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Icon Design</h3>
              </div>
              <p className="mb-4 text-gray-400">
                Master the art of creating beautiful, functional icons for
                mobile applications.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-gray-400">
                <li>• Design Principles</li>
                <li>• Color Theory and Typography</li>
                <li>• Platform Guidelines</li>
                <li>• Adaptive Icons</li>
                <li>• Brand Consistency</li>
              </ul>
              <Link
                href="/tutorials?category=Design"
                className="font-medium text-purple-400 hover:text-purple-300"
              >
                View Path →
              </Link>
            </div>

            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-gray-800 p-2">
                  <Smartphone className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  App Publishing
                </h3>
              </div>
              <p className="mb-4 text-gray-400">
                Learn how to successfully publish and optimize your apps in app
                stores.
              </p>
              <ul className="mb-6 space-y-2 text-sm text-gray-400">
                <li>• App Store Guidelines</li>
                <li>• Submission Process</li>
                <li>• App Store Optimization</li>
                <li>• Marketing Strategies</li>
                <li>• Analytics and Monitoring</li>
              </ul>
              <Link
                href="/tutorials?category=Publishing"
                className="font-medium text-green-400 hover:text-green-300"
              >
                View Path →
              </Link>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-12">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:bg-gray-800 hover:text-white"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-white">
                Difficulty
              </h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:bg-gray-800 hover:text-white"
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Tutorials */}
        <section>
          <h2 className="mb-8 text-3xl font-bold text-white">
            All Tutorials
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {allTutorials.map((tutorial) => (
              <article
                key={tutorial.slug}
                className="rounded-lg border border-gray-800 bg-gray-900 p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      tutorial.difficulty === "Beginner"
                        ? "bg-green-900/50 text-green-400"
                        : tutorial.difficulty === "Intermediate"
                        ? "bg-yellow-900/50 text-yellow-400"
                        : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {tutorial.difficulty}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    <span className="text-sm text-gray-400">{tutorial.rating}</span>
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-bold text-white transition-colors hover:text-sky-400">
                  <Link href={`/tutorials/${tutorial.slug}`}>
                    {tutorial.title}
                  </Link>
                </h3>

                <p className="mb-3 text-sm text-gray-400">
                  {tutorial.description}
                </p>

                <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                  <span>{tutorial.duration}</span>
                  <span>{tutorial.students.toLocaleString()} students</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {tutorial.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/tutorials/${tutorial.slug}`}
                    className="text-sm font-medium text-sky-400 hover:text-sky-300"
                  >
                    Start →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Ready to Build Amazing Apps?
          </h3>
          <p className="mx-auto mb-6 max-w-2xl text-gray-400">
            Start with our beginner-friendly tutorials and work your way up to
            advanced topics. Join thousands of developers who have successfully
            launched their apps.
          </p>
          <Link
            href="/tutorials/expo-app-development-complete-guide"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
