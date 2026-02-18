"use client";

import React, { useState } from "react";
import { Send, Heart } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadType: string;
}

interface FeedbackData {
  feedback: string;
  userEmail: string;
  downloadType: string;
}

const submitFeedback = async (data: FeedbackData): Promise<void> => {
  const response = await fetch("/api/send-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
};

export default function FeedbackModal({
  isOpen,
  onClose,
  downloadType,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const feedbackMutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      // Reset form
      setFeedback("");
      setUserEmail("");
      onClose();

      // Redirect to support page after 1 second
      setTimeout(() => {
        router.push("/thanks-gift");
      }, 1000);
    },
    onError: (error) => {
      console.error("Error submitting feedback:", error);
    },
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Please provide some feedback before submitting.");
      return;
    }

    feedbackMutation.mutate({
      feedback: feedback.trim(),
      userEmail: userEmail.trim(),
      downloadType,
    });
  };

  const handleClose = () => {
    if (!feedbackMutation.isPending) {
      onClose();
      setFeedback("");
      setUserEmail("");
      feedbackMutation.reset();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            Help Us Improve!
          </DialogTitle>
          <DialogDescription>
            Thanks for downloading {downloadType}! Your feedback helps us build
            better features.
          </DialogDescription>
        </DialogHeader>

        {feedbackMutation.isSuccess ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Thank You!
            </h3>
            <p className="text-gray-400">
              Your feedback has been sent successfully. We appreciate your
              input!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Feedback Text Area */}
            <div>
              <label
                htmlFor="feedback"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                What features would you like to see next? Any suggestions?
              </label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you'd like to see improved or added to Expo Icon Generator..."
                rows={4}
                required
                disabled={feedbackMutation.isPending}
              />
            </div>

            {/* Optional Email */}
            <div>
              <label
                htmlFor="userEmail"
                className="mb-2 block text-sm font-medium text-gray-300"
              >
                Your Email (optional - for follow-up questions)
              </label>
              <input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:border-transparent focus:ring-2 focus:ring-gray-400"
                disabled={feedbackMutation.isPending}
              />
            </div>

            {/* Error Message */}
            {feedbackMutation.isError && (
              <div className="rounded-lg border border-red-800 bg-red-950 p-3">
                <p className="text-sm text-red-400">
                  Failed to send feedback. Please try again or email us directly
                  at bhosalenaresh73@gmail.com
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={feedbackMutation.isPending}
                className="flex-1"
              >
                Skip
              </Button>
              <Button
                type="submit"
                disabled={feedbackMutation.isPending || !feedback.trim()}
                className="flex-1"
              >
                {feedbackMutation.isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
