"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  GitFork,
  Loader2,
  AlertCircle,
  Users,
} from "lucide-react";

// TypeScript interfaces for API contributor data
interface APIContributor {
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
  contributors: APIContributor[];
  total: number;
  cached?: boolean;
}

// Contributor card component
function ContributorCard({ contributor }: { contributor: APIContributor }) {
  const displayName = contributor.name || contributor.username;
  const joinDate = new Date(contributor.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
    }
  );
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Avatar and basic info */}
      <div className="mb-4 flex items-center gap-4">
        <Image
          src={contributor.avatar_url}
          alt={`${displayName} avatar`}
          width={80}
          height={80}
          className="rounded-full border-2 border-sky-100"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/default-avatar.png";
          }}
        />
        <div className="flex-1">
          <h3 className="mb-1 text-xl font-bold text-gray-900">
            {displayName}
          </h3>
          <p className="mb-1 font-medium text-sky-600">
            {contributor.contributions} contribution
            {contributor.contributions !== 1 ? "s" : ""}
          </p>
          <p className="text-sm text-gray-500">@{contributor.username}</p>
        </div>
      </div>

      {/* Bio */}
      {contributor.bio && (
        <p className="mb-4 line-clamp-3 leading-relaxed text-gray-700">
          {contributor.bio}
        </p>
      )}

      {/* Stats */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">
            {contributor.public_repos}
          </div>
          <div className="text-xs text-gray-500">Repositories</div>
        </div>
        <div className="rounded-lg bg-gray-50 p-3 text-center">
          <div className="text-lg font-bold text-gray-900">
            {contributor.followers}
          </div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mb-4 space-y-2">
        {contributor.location && (
          <p className="text-sm text-gray-600">📍 {contributor.location}</p>
        )}
        {contributor.company && (
          <p className="text-sm text-gray-600">🏢 {contributor.company}</p>
        )}
        <p className="text-sm text-gray-500">📅 Joined {joinDate}</p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link
          href={`/contributors/${contributor.username}`}
          className="flex-1 rounded-lg bg-sky-100 px-3 py-2 text-center text-sm font-medium text-sky-700 transition-colors hover:bg-sky-200"
        >
          View Profile
        </Link>
        <Link
          href={contributor.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-gray-100 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
          aria-label={`Visit ${contributor.username}'s GitHub profile`}
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<APIContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contributors from API
  const fetchContributors = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contributors");

      if (!response.ok) {
        throw new Error("Failed to fetch contributors");
      }

      const data: ContributorsResponse = await response.json();
      setContributors(data.contributors || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load contributors"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch contributors on component mount
  useEffect(() => {
    fetchContributors();
  }, [fetchContributors]);

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Contributors
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
            Meet the amazing people who make Expo Icon Generator possible. Their
            dedication and expertise help developers worldwide create beautiful
            icons for their mobile applications.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="text-lg">Loading contributors...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center">
            <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-8">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
              <h3 className="mb-2 text-lg font-semibold text-red-700">
                Failed to load contributors
              </h3>
              <p className="mb-4 text-red-600">{error}</p>
              <button
                onClick={fetchContributors}
                className="rounded-lg bg-red-100 px-6 py-2 font-medium text-red-700 transition-colors hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Contributors Grid */}
        {!isLoading && !error && contributors.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contributors.map((contributor) => (
              <ContributorCard
                key={contributor.username}
                contributor={contributor}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && contributors.length === 0 && (
          <div className="py-16 text-center">
            <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold text-gray-700">
              No contributors found
            </h3>
            <p className="mb-6 text-gray-500">
              We couldn&apos;t find any contributors at the moment.
            </p>
            <button
              onClick={fetchContributors}
              className="rounded-lg bg-sky-100 px-6 py-2 font-medium text-sky-700 transition-colors hover:bg-sky-200"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Call to action */}
        <div className="rounded-2xl bg-linear-to-r from-sky-500 to-blue-600 p-8 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <GitFork className="mx-auto mb-4 h-12 w-12" />
            <h2 className="mb-4 text-3xl font-bold">Want to Contribute?</h2>
            <p className="mb-6 text-lg text-sky-100">
              We welcome contributions from developers of all skill levels!
              Whether it&apos;s bug fixes, new features, documentation, or
              design improvements, your help makes this project better for
              everyone.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="https://github.com/WebNaresh/expo-icon-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-sky-600 transition-colors duration-200 hover:bg-gray-50"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                View on GitHub
              </Link>

              <Link
                href="https://github.com/WebNaresh/expo-icon-generator/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-sky-700 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-sky-800"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Report Issues
              </Link>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center font-medium text-sky-600 transition-colors duration-200 hover:text-sky-700"
          >
            ← Back to Icon Generator
          </Link>
        </div>
      </div>
    </div>
  );
}
