"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Github, Mail, LogIn, LogOut } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contributors", label: "Contributors" },
];

export function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();

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
            {isClient && (
              session ? (
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "User"}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="hidden max-w-24 truncate text-xs text-gray-400 sm:block">
                    {session.user?.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                    title="Sign Out"
                  >
                    <LogOut className="h-3 w-3" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-sky-500 px-3 py-1.5 text-xs font-medium text-sky-400 transition-colors hover:bg-sky-500/10"
                >
                  <LogIn className="h-3 w-3" />
                  Sign In
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
