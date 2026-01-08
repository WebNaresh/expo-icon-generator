import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  Loader2,
  AlertCircle,
  ExternalLink,
  MapPin,
  Building2,
  Globe,
  Twitter,
  Github,
} from "lucide-react";

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

interface ContributorsSectionProps {
  contributors: Contributor[];
  isLoadingContributors: boolean;
  contributorsError: string | null;
}

export default function ContributorsSection({
  contributors,
  isLoadingContributors,
  contributorsError,
}: ContributorsSectionProps) {
  return (
    <div className="mx-auto mt-16 max-w-6xl">
      <div className="mb-12 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <Users className="h-8 w-8 text-sky-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Meet Our Contributors
          </h2>
        </div>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          The amazing developers who make Expo Icon Generator possible through
          their contributions and dedication.
        </p>
      </div>

      {isLoadingContributors ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading contributors...</span>
          </div>
        </div>
      ) : contributorsError ? (
        <div className="py-12 text-center">
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <p className="mb-2 font-medium text-red-700">
              Failed to load contributors
            </p>
            <p className="text-sm text-red-600">{contributorsError}</p>
            <p className="mt-3 text-sm text-gray-600">
              Please try refreshing the page
            </p>
          </div>
        </div>
      ) : contributors.length > 0 ? (
        <>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {contributors.slice(0, 6).map((contributor) => (
              <div
                key={contributor.username}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <Image
                    src={contributor.avatar_url}
                    alt={`${contributor.username}'s avatar`}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full border-2 border-sky-100"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-lg font-bold text-gray-900">
                        {contributor.name || contributor.username}
                      </h3>
                      <span className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-700">
                        {contributor.contributions} commits
                      </span>
                    </div>
                    <p className="mb-2 text-sm text-gray-600">
                      @{contributor.username}
                    </p>
                    {contributor.bio && (
                      <p className="mb-3 line-clamp-2 text-sm text-gray-700">
                        {contributor.bio}
                      </p>
                    )}
                    <div className="mb-3 flex flex-wrap gap-2 text-xs text-gray-500">
                      {contributor.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {contributor.location}
                        </span>
                      )}
                      {contributor.company && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {contributor.company}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{contributor.public_repos} repos</span>
                        <span>{contributor.followers} followers</span>
                      </div>
                      <div className="flex gap-2">
                        {contributor.blog && (
                          <a
                            href={
                              contributor.blog.startsWith("http")
                                ? contributor.blog
                                : `https://${contributor.blog}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition-colors hover:text-sky-600"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        {contributor.twitter_username && (
                          <a
                            href={`https://twitter.com/${contributor.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 transition-colors hover:text-sky-600"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        <a
                          href={contributor.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 transition-colors hover:text-sky-600"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contributors"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 font-medium text-white transition-colors hover:bg-sky-700"
            >
              View All Contributors
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </>
      ) : (
        <div className="py-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="text-gray-500">No contributors found</p>
        </div>
      )}
    </div>
  );
}
