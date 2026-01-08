import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Play,
} from "lucide-react";
import { tutorials, type Tutorial } from "../../_data/tutorials";

const getTutorial = async (slug: string): Promise<Tutorial | null> => {
  return tutorials.find((tutorial) => tutorial.slug === slug) || null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  if (!tutorial) {
    return {
      title: "Tutorial Not Found",
    };
  }

  return {
    title: `${tutorial.title} | Expo Icon Generator Tutorials`,
    description: tutorial.description,
    keywords: tutorial.topics,
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      type: "article",
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {/* Back Navigation */}
        <Link
          href="/tutorials"
          className="mb-8 inline-flex items-center gap-2 font-medium text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tutorials
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tutorial Header */}
            <header className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    tutorial.difficulty === "Beginner"
                      ? "bg-green-100 text-green-700"
                      : tutorial.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {tutorial.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  {tutorial.category}
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                {tutorial.title}
              </h1>

              <p className="mb-6 text-lg text-gray-600">
                {tutorial.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{tutorial.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{tutorial.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span>{tutorial.rating} rating</span>
                </div>
              </div>
            </header>

            {/* Tutorial Content */}
            <article className="prose prose-lg max-w-none">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: tutorial.content
                    .replace(/\n/g, "<br />")
                    .replace(/#{1,6}\s/g, (match) => {
                      const level = match.trim().length;
                      return `<h${level} class="text-${
                        4 - level
                      }xl font-bold text-gray-900 mt-8 mb-4">`;
                    })
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(
                      /`([^`]+)`/g,
                      '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>'
                    ),
                }}
              />
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Progress */}
              <div className="rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Course Content
                </h3>
                <div className="space-y-3">
                  {tutorial.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      className="flex items-center gap-3 rounded-lg bg-white p-3"
                    >
                      <div className="shrink-0">
                        {chapter.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Play className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {index + 1}. {chapter.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {chapter.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Covered */}
              <div className="rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutorial.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="rounded-xl bg-linear-to-r from-purple-600 to-pink-600 p-6 text-center text-white">
                <BookOpen className="mx-auto mb-3 h-8 w-8" />
                <h3 className="mb-2 text-lg font-semibold">Ready to Start?</h3>
                <p className="mb-4 text-sm opacity-90">
                  Begin this tutorial and start building amazing apps today.
                </p>
                <button className="w-full rounded-lg bg-white py-2 font-medium text-purple-600 transition-colors hover:bg-gray-100">
                  Start Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
