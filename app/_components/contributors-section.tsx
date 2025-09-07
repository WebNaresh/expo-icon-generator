import React from "react";
import Link from "next/link";
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
    <div className="max-w-6xl mx-auto mt-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="w-8 h-8 text-sky-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Meet Our Contributors
          </h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          The amazing developers who make Expo Icon Generator possible through
          their contributions and dedication.
        </p>
      </div>

      {isLoadingContributors ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex items-center gap-3 text-gray-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading contributors...</span>
          </div>
        </div>
      ) : contributorsError ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
            <p className="text-red-700 font-medium mb-2">
              Failed to load contributors
            </p>
            <p className="text-red-600 text-sm">{contributorsError}</p>
            <p className="text-gray-600 text-sm mt-3">
              Please try refreshing the page
            </p>
          </div>
        </div>
      ) : contributors.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {contributors.slice(0, 6).map((contributor) => (
              <div
                key={contributor.username}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={contributor.avatar_url}
                    alt={`${contributor.username}'s avatar`}
                    className="w-16 h-16 rounded-full border-2 border-sky-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {contributor.name || contributor.username}
                      </h3>
                      <span className="bg-sky-100 text-sky-700 text-xs font-medium px-2 py-1 rounded-full">
                        {contributor.contributions} commits
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      @{contributor.username}
                    </p>
                    {contributor.bio && (
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {contributor.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                      {contributor.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {contributor.location}
                        </span>
                      )}
                      {contributor.company && (
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
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
                            className="text-gray-400 hover:text-sky-600 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                        {contributor.twitter_username && (
                          <a
                            href={`https://twitter.com/${contributor.twitter_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-sky-600 transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={contributor.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-sky-600 transition-colors"
                        >
                          <Github className="w-4 h-4" />
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
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              View All Contributors
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No contributors found</p>
        </div>
      )}
    </div>
  );
}
