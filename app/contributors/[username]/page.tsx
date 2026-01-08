import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Github,
  ExternalLink,
  MapPin,
  Building,
  Calendar,
  Users,
  BookOpen,
  Download,
  Award,
} from "lucide-react";
import { downloadCertificate } from "@/lib/certificate-generator";

// TypeScript interfaces
interface Contributor {
  username: string;
  name: string | null;
  avatar_url: string;
  profile_url: string;
  contributions: number;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

interface ContributorsResponse {
  contributors: Contributor[];
  total: number;
}

// Fetch contributors from our API
async function fetchContributors(): Promise<Contributor[]> {
  // During build time, return empty array to avoid fetch errors
  if (process.env.NODE_ENV === "production" && !process.env.VERCEL_URL) {
    console.log("Build time: Skipping contributor fetch");
    return [];
  }

  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/contributors`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contributors");
    }

    const data: ContributorsResponse = await response.json();
    return data.contributors || [];
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return [];
  }
}

// Find contributor by username
async function getContributor(username: string): Promise<Contributor | null> {
  const contributors = await fetchContributors();
  return (
    contributors.find(
      (c) => c.username.toLowerCase() === username.toLowerCase()
    ) || null
  );
}

// Generate static params for all contributors
export async function generateStaticParams() {
  try {
    const contributors = await fetchContributors();

    return contributors.map((contributor) => ({
      username: contributor.username,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for each contributor page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const contributor = await getContributor(username);

  if (!contributor) {
    return {
      title: "Contributor Not Found - Expo Icon Generator",
      description: "The requested contributor could not be found.",
    };
  }

  const displayName = contributor.name || contributor.username;

  return {
    title: `${displayName} - Contributor Profile | Expo Icon Generator`,
    description: `Learn about ${displayName}, a contributor to Expo Icon Generator with ${
      contributor.contributions
    } contributions. ${contributor.bio || ""}`,
    keywords: [
      "contributor",
      "developer",
      "open source",
      "expo",
      "react native",
      displayName,
    ],
    openGraph: {
      title: `${displayName} - Contributor Profile`,
      description: `${displayName} has made ${contributor.contributions} contributions to Expo Icon Generator.`,
      type: "profile",
      images: [
        {
          url: contributor.avatar_url,
          width: 400,
          height: 400,
          alt: `${displayName} profile picture`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${displayName} - Contributor Profile`,
      description: `${displayName} has made ${contributor.contributions} contributions to Expo Icon Generator.`,
      images: [contributor.avatar_url],
    },
  };
}

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Download certificate function
function handleDownloadCertificate(contributor: Contributor) {
  try {
    const contributorData = {
      username: contributor.username,
      name: contributor.name,
      contributions: contributor.contributions,
      joinDate: formatDate(contributor.created_at),
    };

    downloadCertificate(contributorData);
  } catch (error) {
    console.error("Error downloading certificate:", error);
    alert("Failed to generate certificate. Please try again.");
  }
}

export default async function ContributorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const contributor = await getContributor(username);

  if (!contributor) {
    notFound();
  }

  const displayName = contributor.name || contributor.username;
  const joinDate = formatDate(contributor.created_at);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/contributors"
            className="inline-flex items-center font-medium text-sky-600 transition-colors hover:text-sky-700"
          >
            ← Back to Contributors
          </Link>
        </div>

        {/* Profile Header */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-xl">
          <div className="flex flex-col items-start gap-8 md:flex-row">
            {/* Avatar */}
            <div className="relative">
              <Image
                src={contributor.avatar_url}
                alt={`${displayName} profile picture`}
                width={150}
                height={150}
                className="rounded-full border-4 border-sky-100 shadow-lg"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/default-avatar.png";
                }}
              />
              <div className="absolute -right-2 -bottom-2 rounded-full bg-sky-500 p-2 text-white">
                <Award className="h-5 w-5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    {displayName}
                  </h1>
                  <p className="mb-2 text-xl font-medium text-sky-600">
                    @{contributor.username}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {joinDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {contributor.followers} followers
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 sm:mt-0">
                  <Link
                    href={contributor.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-800"
                  >
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </Link>
                  <button
                    onClick={() => handleDownloadCertificate(contributor)}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-white transition-colors hover:bg-sky-700"
                  >
                    <Download className="h-4 w-4" />
                    Certificate
                  </button>
                </div>
              </div>

              {contributor.bio && (
                <p className="mb-4 leading-relaxed text-gray-700">
                  {contributor.bio}
                </p>
              )}

              {/* Additional Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {contributor.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {contributor.location}
                  </span>
                )}
                {contributor.company && (
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {contributor.company}
                  </span>
                )}
                {contributor.blog && (
                  <Link
                    href={
                      contributor.blog.startsWith("http")
                        ? contributor.blog
                        : `https://${contributor.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sky-600 hover:text-sky-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Website
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {contributor.contributions}
            </h3>
            <p className="text-gray-600">
              Contribution{contributor.contributions !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {contributor.public_repos}
            </h3>
            <p className="text-gray-600">Public Repositories</p>
          </div>

          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-1 text-2xl font-bold text-gray-900">
              {contributor.followers}
            </h3>
            <p className="text-gray-600">GitHub Followers</p>
          </div>
        </div>

        {/* Contribution Details */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Contribution Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Expo Icon Generator
                </h3>
                <p className="text-sm text-gray-600">
                  Main project contributions
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-sky-600">
                  {contributor.contributions}
                </span>
                <p className="text-sm text-gray-500">commits</p>
              </div>
            </div>

            <div className="py-8 text-center text-gray-500">
              <p>
                Detailed contribution history and commit information will be
                available soon.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Contributors */}
        <div className="mt-12 text-center">
          <Link
            href="/contributors"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-sky-700"
          >
            <Users className="h-5 w-5" />
            View All Contributors
          </Link>
        </div>
      </div>
    </div>
  );
}
