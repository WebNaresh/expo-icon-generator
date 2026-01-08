"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
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
          </Link>

          {/* Greeting Message */}
          <div className="hidden items-center lg:flex">
            <span className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-sm font-medium text-gray-600">
              👋 Hello, Developer!
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            {isClient ? (
              <>
                <Link
                  href="/"
                  className="font-medium text-gray-600 transition-colors hover:text-sky-600"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="font-medium text-gray-600 transition-colors hover:text-sky-600"
                >
                  Blog
                </Link>
                <Link
                  href="/tutorials"
                  className="font-medium text-gray-600 transition-colors hover:text-sky-600"
                >
                  Tutorials
                </Link>
                <Link
                  href="/faq"
                  className="font-medium text-gray-600 transition-colors hover:text-sky-600"
                >
                  FAQ
                </Link>
                <Link
                  href="/contributors"
                  className="font-medium text-gray-600 transition-colors hover:text-sky-600"
                >
                  Contributors
                </Link>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-600 transition-colors hover:text-sky-600"
                >
                  GitHub
                </Link>
              </>
            ) : (
              <>
                <span className="font-medium text-gray-600">Home</span>
                <span className="font-medium text-gray-600">Blog</span>
                <span className="font-medium text-gray-600">Tutorials</span>
                <span className="font-medium text-gray-600">FAQ</span>
                <span className="font-medium text-gray-600">Contributors</span>
                <span className="font-medium text-gray-600">GitHub</span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
