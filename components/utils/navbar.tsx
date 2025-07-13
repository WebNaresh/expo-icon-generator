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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
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
          <div className="hidden lg:flex items-center">
            <span className="text-gray-600 text-sm font-medium px-3 py-1 bg-sky-50 rounded-full border border-sky-100">
              👋 Hello, Developer!
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {isClient ? (
              <>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/contributors"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  Contributors
                </Link>
                <Link
                  href="https://github.com/WebNaresh/expo-icon-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  GitHub
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-600 font-medium">Home</span>
                <span className="text-gray-600 font-medium">Contributors</span>
                <span className="text-gray-600 font-medium">GitHub</span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
