"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Heart, GitFork } from "lucide-react";

// TypeScript interfaces for contributor data
interface SocialLink {
  platform: "github" | "linkedin" | "website";
  url: string;
  username?: string;
}

interface Contributor {
  id: string;
  name: string;
  role: string;
  description: string;
  githubUsername: string;
  avatarUrl: string;
  socialLinks: SocialLink[];
  contributions: string[];
}

// Contributor data
const contributors: Contributor[] = [
  {
    id: "naresh-bhosale",
    name: "Naresh Bhosale",
    role: "Creator & Lead Developer",
    description:
      "Full-stack developer passionate about React Native, Next.js, and developer tools. Created Expo Icon Generator to simplify the icon generation process for mobile app developers.",
    githubUsername: "WebNaresh",
    avatarUrl: "https://github.com/WebNaresh.png",
    socialLinks: [
      {
        platform: "github",
        url: "https://github.com/WebNaresh",
        username: "WebNaresh",
      },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/naresh-bhosale-173145265/",
        username: "naresh-bhosale-173145265",
      },
    ],
    contributions: [
      "Project architecture and setup",
      "Icon generation algorithms",
      "PWA implementation",
      "UI/UX design and development",
      "API development and optimization",
    ],
  },
];

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
function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      {/* Avatar and basic info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={contributor.avatarUrl}
            alt={`${contributor.name} profile picture`}
            width={80}
            height={80}
            className="rounded-full border-2 border-sky-100"
            priority
            onError={(e) => {
              // Fallback to default avatar if GitHub image fails
              const target = e.target as HTMLImageElement;
              target.src = "/default-avatar.png";
            }}
          />
          <div className="absolute -bottom-1 -right-1 bg-sky-500 text-white rounded-full p-1">
            <Heart className="w-3 h-3 fill-current" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {contributor.name}
          </h3>
          <p className="text-sky-600 font-medium mb-2">{contributor.role}</p>

          {/* Social links */}
          <div className="flex space-x-3">
            {contributor.socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-gray-600 hover:text-sky-600 transition-colors duration-200"
                aria-label={`${contributor.name}'s ${link.platform} profile`}
              >
                <SocialIcon platform={link.platform} />
                {link.username && (
                  <span className="text-sm">@{link.username}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-4 leading-relaxed">
        {contributor.description}
      </p>

      {/* Contributions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          Key Contributions:
        </h4>
        <ul className="space-y-1">
          {contributor.contributions.map((contribution, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-sky-500 mr-2">•</span>
              {contribution}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ContributorsPage() {
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

        {/* Contributors grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {contributors.map((contributor) => (
            <ContributorCard key={contributor.id} contributor={contributor} />
          ))}
        </div>

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
