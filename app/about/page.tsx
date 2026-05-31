import type { Metadata } from "next";
import Link from "next/link";
import { Github, Mail, Zap, Code2, ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/about",
  },
  title: "About - Expo Assets Generator",
  description:
    "Learn about Expo Assets Generator — a free tool that creates all required iOS, Android, and web icons for your Expo React Native app from a single image.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="mb-6 text-4xl font-bold text-white">About</h1>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            What is Expo Assets Generator?
          </h2>
          <p className="mb-4 leading-relaxed text-gray-400">
            Expo Assets Generator is a free, open-source web tool that takes a
            single source image and produces every icon file your Expo or React
            Native app needs — iOS icons, an Android adaptive icon, a splash
            screen, and a web favicon — along with a pre-configured{" "}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-sky-400">
              app.json
            </code>{" "}
            ready to drop into your project.
          </p>
          <p className="leading-relaxed text-gray-400">
            Before this tool, developers had to resize images manually, match
            background colours across files, and edit JSON by hand for each new
            project. Expo Assets Generator does all of this automatically.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            How it works
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="mt-0.5 shrink-0 rounded-lg bg-gray-800 p-2">
                <ImageIcon className="h-5 w-5 text-sky-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  1. Upload one image
                </h3>
                <p className="text-sm text-gray-400">
                  Drop in a PNG, JPG, or SVG (1024×1024px or larger recommended).
                  Transparent backgrounds work best for adaptive icons.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="mt-0.5 shrink-0 rounded-lg bg-gray-800 p-2">
                <Zap className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  2. Choose a background colour
                </h3>
                <p className="text-sm text-gray-400">
                  The tool analyses your image and suggests background colours
                  that complement it. This colour is used for the Android adaptive
                  icon background and the splash screen.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl border border-gray-800 bg-gray-900 p-5">
              <div className="mt-0.5 shrink-0 rounded-lg bg-gray-800 p-2">
                <Code2 className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-white">
                  3. Download and use
                </h3>
                <p className="text-sm text-gray-400">
                  Download a ZIP containing all generated assets and a
                  pre-configured{" "}
                  <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-sky-400">
                    app.json
                  </code>
                  . Copy the files into your project and run{" "}
                  <code className="rounded bg-gray-800 px-1 py-0.5 text-xs text-sky-400">
                    npx expo start
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            What gets generated
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-900">
                  <th className="px-4 py-3 text-left font-medium text-gray-300">
                    File
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-300">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-300">
                    Platform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {[
                  ["icon.png", "1024×1024", "iOS · Android (legacy) · General"],
                  ["adaptive-icon.png", "1024×1024", "Android 8.0+"],
                  ["splash.png", "1284×2778", "iOS · Android"],
                  ["splash-icon.png", "200×200", "iOS · Android"],
                  ["favicon.png", "48×48", "Web"],
                ].map(([file, size, platform]) => (
                  <tr key={file} className="bg-gray-900/50">
                    <td className="px-4 py-3 font-mono text-sky-400">{file}</td>
                    <td className="px-4 py-3 text-gray-400">{size}</td>
                    <td className="px-4 py-3 text-gray-400">{platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Technology</h2>
          <p className="mb-4 leading-relaxed text-gray-400">
            Image processing is handled by{" "}
            <a
              href="https://sharp.pixelplumbing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300"
            >
              Sharp
            </a>
            , a high-performance Node.js image processing library. The web
            application is built with Next.js and deployed on Vercel. All
            processing happens server-side — uploaded images are not stored after
            generation.
          </p>
          <p className="leading-relaxed text-gray-400">
            The project is open source. Contributions are welcome on GitHub.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Get in touch
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="https://github.com/WebNaresh/expo-icon-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-gray-300 transition-colors hover:border-gray-700 hover:text-white"
            >
              <Github className="h-5 w-5" />
              <span>GitHub — open issues, PRs, and discussions</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-gray-300 transition-colors hover:border-gray-700 hover:text-white"
            >
              <Mail className="h-5 w-5" />
              <span>Send feedback or a question</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
