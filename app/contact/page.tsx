"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Mail, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedback: `Name: ${name}\n\n${message}`,
          userEmail: email,
          downloadType: "Contact Form",
          rating: null,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Failed to send. Try emailing directly or opening a GitHub issue.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold text-white">Contact</h1>
        <p className="mb-12 text-lg text-gray-400">
          Questions, bug reports, or feature requests — use the form below or
          reach out directly.
        </p>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <a
            href="https://github.com/WebNaresh/expo-icon-generator/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-gray-300 transition-colors hover:border-gray-700 hover:text-white"
          >
            <Github className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">GitHub Issues</p>
              <p className="text-xs text-gray-500">Bug reports and feature requests</p>
            </div>
          </a>
          <a
            href="mailto:bhosalenaresh73@gmail.com"
            className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900 px-5 py-4 text-gray-300 transition-colors hover:border-gray-700 hover:text-white"
          >
            <Mail className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-xs text-gray-500">bhosalenaresh73@gmail.com</p>
            </div>
          </a>
        </div>

        {sent ? (
          <div className="flex items-center gap-4 rounded-xl border border-green-800 bg-green-900/20 p-6">
            <CheckCircle className="h-6 w-6 shrink-0 text-green-400" />
            <div>
              <p className="font-semibold text-white">Message sent</p>
              <p className="text-sm text-gray-400">
                Thanks — we&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="mb-2 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-sky-400" />
              <h2 className="text-xl font-semibold text-white">Send a message</h2>
            </div>

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-300">
                Email <span className="text-gray-500">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your question, bug, or idea..."
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-lg bg-white py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send message"}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-gray-600">
          For general questions, see the{" "}
          <Link href="/faq" className="text-sky-400 hover:text-sky-300">
            FAQ
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
