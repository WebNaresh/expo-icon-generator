"use client";

import { Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SupportButton() {
  const handleSupportClick = () => {
    window.open("https://razorpay.me/@webnaresh", "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleSupportClick}
      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-12 py-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl w-full max-w-md"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        <Sparkles className="w-6 h-6" />
        Support via Razorpay
        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
}