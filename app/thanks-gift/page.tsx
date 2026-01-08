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
              <ArrowLeft className="w-4 h-4" />
              Back to Generator
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <Heart className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Support Our Mission 🚀
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Help us keep{" "}
              <span className="font-semibold text-blue-600">
                Expo Icon Generator
              </span>{" "}
              free and continuously evolving for the developer community
              worldwide.
            </p>
          </div>

          {/* Main Support Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 border border-gray-100">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Coffee className="w-7 h-7 text-amber-600" />
                <h2 className="text-3xl font-bold text-gray-900">
                  Buy Us a Coffee
                </h2>
                <Gift className="w-7 h-7 text-green-600" />
              </div>

              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
                Your support directly contributes to server costs, new features,
                and keeping this tool accessible to everyone.
              </p>
            </div>

            <div className="flex flex-col items-center space-y-6">
              <SupportButton />

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Secure payment powered by Razorpay
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                100% Free
              </h3>
              <p className="text-gray-600">
                Core features remain free for all developers worldwide
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Active Development
              </h3>
              <p className="text-gray-600">
                Regular updates, bug fixes, and exciting new features
              </p>
            </div>

            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Community First
              </h3>
              <p className="text-gray-600">
                Built by developers, for the global developer community
              </p>
            </div>
          </div>

          {/* Appreciation Message */}
          <div className="bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h3 className="text-2xl font-semibold text-amber-800">
                Thank You!
              </h3>
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <p className="text-lg text-amber-700 font-medium">
              Every contribution, big or small, helps us maintain and improve
              this tool. Your support means the world to us! 🌟
            </p>
          </div>

          {/* Alternative Support */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">
              Can&apos;t contribute financially? You can still help us by:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                ⭐ Star our project
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                📢 Share with friends
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                💡 Suggest features
              </span>
              <span className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                🐛 Report bugs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
