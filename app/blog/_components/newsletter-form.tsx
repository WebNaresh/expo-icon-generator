"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface SubscribeResponse {
  success: boolean;
  message: string;
  error?: string;
}

async function subscribeEmail(email: string): Promise<SubscribeResponse> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = (await response.json()) as SubscribeResponse;

  if (!response.ok) {
    throw new Error(data.error ?? "Failed to subscribe");
  }

  return data;
}

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationFn: subscribeEmail,
    onSuccess: () => setEmail(""),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutation.mutate(email.trim());
  };

  return (
    <section className="mt-16 rounded-xl border border-gray-800 bg-gray-900 p-8 text-center shadow-lg">
      <h3 className="mb-4 text-2xl font-bold text-white">
        Stay Updated with Icon Generation Tips
      </h3>
      <p className="mx-auto mb-6 max-w-2xl text-gray-400">
        Get notified when we release updates, new tutorials, and icon generation
        tips. No spam — just the good stuff.
      </p>

      {mutation.isSuccess ? (
        <div className="mx-auto max-w-md rounded-lg border border-green-800 bg-green-900/30 p-4">
          <p className="font-medium text-green-400">{mutation.data?.message}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={mutation.isPending}
            className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={mutation.isPending || !email.trim()}
            className="rounded-lg bg-white px-6 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {mutation.isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {mutation.isError && (
        <p className="mt-3 text-sm text-red-400">
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Something went wrong. Please try again."}
        </p>
      )}
    </section>
  );
}
