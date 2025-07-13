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
                  href="/generator"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  Generator
                </Link>
                <Link
                  href="/docs"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  Documentation
                </Link>
                <Link
                  href="/getting-started"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  Getting Started
                </Link>
                <Link
                  href="/opensource"
                  className="text-gray-600 hover:text-sky-600 transition-colors font-medium"
                >
                  Open Source
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-600 font-medium">Home</span>
                <span className="text-gray-600 font-medium">Generator</span>
                <span className="text-gray-600 font-medium">Documentation</span>
                <span className="text-gray-600 font-medium">
                  Getting Started
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
