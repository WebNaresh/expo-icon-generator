import { Metadata } from "next";
import Link from "next/link";
import { Gift, Heart, Coffee, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportButton } from "./support-button";

export const metadata: Metadata = {
  title: "Support Our Work | Expo Icon Generator",
  description:
    "Support the development of Expo Icon Generator and help us keep this tool free for everyone. Your contribution makes a difference!",
  openGraph: {
    title: "Support Our Work | Expo Icon Generator",
    description:
      "Support the development of Expo Icon Generator and help us keep this tool free for everyone.",
    url: "https://expo-assets-generator.vercel.app/thanks-gift",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support Our Work | Expo Icon Generator",
    description:
      "Support the development of Expo Icon Generator and help us keep this tool free for everyone.",
  },
};

export default function ThanksGiftPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2 hover:bg-gray-50">
              <ArrowLeft className="h-4 w-4" />
              Back to Generator
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-purple-600 shadow-lg">
              <Heart className="h-12 w-12 text-white" />
            </div>

            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Support Our Mission 🚀
            </h1>

            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
              Help us keep{" "}
              <span className="font-semibold text-blue-600">
                Expo Icon Generator
              </span>{" "}
              free and continuously evolving for the developer community
              worldwide.
            </p>
          </div>

          {/* Main Support Card */}
          <div className="mb-10 rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mb-4 flex items-center justify-center gap-3">
                <Coffee className="h-7 w-7 text-amber-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Buy Us a Coffee
                </h2>
                <Gift className="h-7 w-7 text-green-600" />
              </div>

              <p className="mx-auto mb-8 max-w-lg text-lg text-gray-600">
                Your support directly contributes to server costs, new features,
                and keeping this tool accessible to everyone.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <SupportButton />

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Secure payment powered by Razorpay
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="mb-10 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                <Gift className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                100% Free
              </h3>
              <p className="text-gray-600">
                Core features remain free for all developers worldwide
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Active Development
              </h3>
              <p className="text-gray-600">
                Regular updates, bug fixes, and exciting new features
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Community First
              </h3>
              <p className="text-gray-600">
                Built by developers, for the global developer community
              </p>
            </div>
          </div>

          {/* Appreciation Message */}
          <div className="rounded-2xl border-2 border-amber-200 bg-linear-to-r from-amber-50 to-orange-50 p-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <h3 className="text-2xl font-semibold text-amber-800">
                Thank You!
              </h3>
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <p className="text-lg font-medium text-amber-700">
              Every contribution, big or small, helps us maintain and improve
              this tool. Your support means the world to us! 🌟
            </p>
          </div>

          {/* Alternative Support */}
          <div className="mt-10 text-center">
            <p className="mb-4 text-gray-600">
              Can&apos;t contribute financially? You can still help us by:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                ⭐ Star our project
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                📢 Share with friends
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                💡 Suggest features
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">
                🐛 Report bugs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
