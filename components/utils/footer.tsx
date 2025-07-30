import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/web-app-manifest-192x192.png"
                alt="Expo Icon Generator Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">
                Expo Icon Generator
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Automate and simplify icon generation for Expo-based React Native
              apps. Generate platform-specific icons from a single source image
              with one command.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Expo Icon Generator. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contributors"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Contributors
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/complete-guide-expo-icon-generation"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Icon Generation Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ios-android-icon-requirements-2024"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Platform Requirements
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/icon-design-best-practices"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Design Best Practices
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/expo-app-development-complete-guide"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Expo Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Report Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-600 transition-colors"
                >
                  Discussions
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Developer</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/WebNaresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Naresh Bhosale</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/naresh-bhosale-173145265/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href="http://navibyte.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>NaviByte Innovation</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <span className="text-gray-600">
                Built with ❤️ for the Expo developer community
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <a
                href="http://navibyte.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300"
                aria-label="Visit NaviByte Innovation website - opens in new tab"
              >
                <Image
                  src="/navibyte-logo.png"
                  alt="NaviByte Innovation Logo"
                  width={200}
                  height={200}
                  className="rounded-xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 hover:brightness-110"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
