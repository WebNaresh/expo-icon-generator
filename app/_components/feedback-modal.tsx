import React, { useState } from "react";
import { X, Send, Heart } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadType: string;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  downloadType,
}: FeedbackModalProps) {
  const [feedback, setFeedback] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Please provide some feedback before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          userEmail: userEmail.trim(),
          downloadType,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setFeedback("");
          setUserEmail("");
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setFeedback("");
      setUserEmail("");
      setSubmitStatus("idle");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Help Us Improve!
              </h2>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                Your feedback has been sent successfully. We appreciate your
                input!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-gray-600 mb-4">
                  Thanks for downloading {downloadType}! Your feedback helps us
                  build better features.
                </p>
              </div>

              {/* Feedback Text Area */}
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  What features would you like to see next? Any suggestions?
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you'd like to see improved or added to Expo Icon Generator..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Optional Email */}
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Email (optional - for follow-up questions)
                </label>
                <input
                  id="userEmail"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    Failed to send feedback. Please try again or email us
                    directly at bhosalenaresh73@gmail.com
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !feedback.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-400 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
