"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Heart,
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

// Note: Metadata is handled by layout.tsx since this is now a Client Component

// Social link icon component
function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "github":
      return <ExternalLink className="w-5 h-5" />;
    case "linkedin":
      return <ExternalLink className="w-5 h-5" />;
    default:
      return <ExternalLink className="w-5 h-5" />;
  }
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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Avatar and basic info */}
      <div className="flex items-center gap-4 mb-4">
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
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {displayName}
          </h3>
          <p className="text-sky-600 font-medium mb-1">
            {contributor.contributions} contribution
            {contributor.contributions !== 1 ? "s" : ""}
          </p>
          <p className="text-sm text-gray-500">@{contributor.username}</p>
        </div>
      </div>

      {/* Bio */}
      {contributor.bio && (
        <p className="text-gray-700 mb-4 leading-relaxed line-clamp-3">
          {contributor.bio}
        </p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">
            {contributor.public_repos}
          </div>
          <div className="text-xs text-gray-500">Repositories</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-900">
            {contributor.followers}
          </div>
          <div className="text-xs text-gray-500">Followers</div>
        </div>
      </div>

      {/* Additional info */}
      <div className="space-y-2 mb-4">
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
          className="flex-1 text-center px-3 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors text-sm font-medium"
        >
          View Profile
        </Link>
        <Link
          href={contributor.profile_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          aria-label={`Visit ${contributor.username}'s GitHub profile`}
        >
          <ExternalLink className="w-4 h-4" />
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contributors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the amazing people who make Expo Icon Generator possible. Their
            dedication and expertise help developers worldwide create beautiful
            icons for their mobile applications.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-lg">Loading contributors...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-700 mb-2">
                Failed to load contributors
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchContributors}
                className="px-6 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Contributors Grid */}
        {!isLoading && !error && contributors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No contributors found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any contributors at the moment.
            </p>
            <button
              onClick={fetchContributors}
              className="px-6 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors font-medium"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Call to action */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <GitFork className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Want to Contribute?</h2>
            <p className="text-sky-100 mb-6 text-lg">
              We welcome contributions from developers of all skill levels!
              Whether it&apos;s bug fixes, new features, documentation, or
              design improvements, your help makes this project better for
              everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://github.com/WebNaresh/expo-icon-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View on GitHub
              </Link>

              <Link
                href="https://github.com/WebNaresh/expo-icon-generator/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-sky-700 text-white font-semibold rounded-lg hover:bg-sky-800 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Report Issues
              </Link>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium transition-colors duration-200"
          >
            ← Back to Icon Generator
          </Link>
        </div>
      </div>
    </div>
  );
}
