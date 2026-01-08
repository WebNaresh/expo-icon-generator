import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
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
            <p className="mb-4 max-w-md text-gray-600">
              Automate and simplify icon generation for Expo-based React Native
              apps. Generate platform-specific icons from a single source image
              with one command.
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Expo Icon Generator. All rights reserved.
            </p>
          </div>

          {/* Our Products Section */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Our Products</h3>
            <ul className="space-y-3">
              <li>
                <div className="rounded-lg border border-gray-200 bg-sky-50 p-3">
                  <div className="mb-1 font-medium text-sky-700">
                    Expo Icon Generator
                  </div>
                  <div className="text-sm text-gray-600">
                    Current tool - Generate platform-specific icons
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="https://www.freeqrcodegenerator.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 transition-colors group-hover:text-sky-600">
                        Free QR Code Generator
                      </div>
                      <div className="text-sm text-gray-600">
                        Create custom QR codes for free
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-sky-600" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contributors"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Contributors
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog/complete-guide-expo-icon-generation"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Icon Generation Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ios-android-icon-requirements-2024"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Platform Requirements
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/icon-design-best-practices"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Design Best Practices
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials/expo-app-development-complete-guide"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Expo Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  GitHub Repository
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Report Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 transition-colors hover:text-sky-600"
                >
                  Discussions
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Section */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900">Developer</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/WebNaresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-600 transition-colors hover:text-sky-600"
                >
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>Naresh Bhosale</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/naresh-bhosale-173145265/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-600 transition-colors hover:text-sky-600"
                >
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>LinkedIn Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  href="http://navibyte.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-gray-600 transition-colors hover:text-sky-600"
                >
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span>NaviByte Innovation</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 text-sm sm:flex-row">
              <span className="text-gray-600">
                Built with ❤️ for the Expo developer community
              </span>
              <span className="hidden text-gray-300 sm:inline">•</span>
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
                  className="rounded-xl shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg hover:brightness-110"
                />
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
