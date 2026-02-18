"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Github, Mail } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contributors", label: "Contributors" },
];

export function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <Image
              src="/web-app-manifest-192x192.png"
              alt="Expo Icon Generator Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="text-sm font-bold text-white">
              Expo Icon Generator
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {isClient
              ? NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md px-3 py-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))
              : NAV_LINKS.map((link) => (
                  <span
                    key={link.href}
                    className="rounded-md px-3 py-1.5 text-sm text-gray-400"
                  >
                    {link.label}
                  </span>
                ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/WebNaresh/expo-icon-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <a
              href="mailto:bhosalenaresh73@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-medium text-gray-900 transition-colors hover:bg-gray-200"
            >
              <Mail className="h-3 w-3" />
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
