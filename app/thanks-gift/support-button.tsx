"use client";

import { Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SupportButton() {
  const handleSupportClick = () => {
    window.open(
      "https://razorpay.me/@webnaresh",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      onClick={handleSupportClick}
      className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 px-12 py-6 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        <Sparkles className="h-6 w-6" />
        Support via Razorpay
        <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  );
}
