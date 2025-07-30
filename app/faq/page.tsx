"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  BookOpen,
} from "lucide-react";
import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqData: FAQItem[] = [
  {
    id: "what-is-expo-icon-generator",
    question: "What is Expo Icon Generator and how does it work?",
    answer:
      "Expo Icon Generator is a free web-based tool that automatically creates all the required icon sizes and formats for your Expo React Native applications. Simply upload a single high-quality image (1024×1024px recommended), and our tool generates platform-specific icons for iOS, Android, and web platforms. The process includes automatic color analysis, background optimization, and proper sizing for all required formats including adaptive icons for Android.",
    category: "General",
    tags: ["basics", "overview", "how-it-works"],
  },
  {
    id: "supported-file-formats",
    question: "What file formats are supported for upload?",
    answer:
      "We support PNG, JPG, JPEG, and SVG file formats. PNG is recommended for the best quality results as it supports transparency and provides crisp edges. The maximum file size is 10MB, and we recommend using images that are at least 1024×1024px for optimal results across all generated icon sizes.",
    category: "Technical",
    tags: ["file-formats", "upload", "requirements"],
  },
  {
    id: "icon-sizes-generated",
    question: "What icon sizes and formats are generated?",
    answer:
      "Our tool generates all the essential icon formats you need: adaptive-icon.png (1024×1024px for Android), icon.png (1024×1024px main app icon), splash-icon.png (1024×1024px for splash screens), favicon.png (48×48px for web), and multi-density icons (@1x, @2x, @3x) for different screen resolutions. This covers all requirements for iOS App Store, Google Play Store, and web deployment.",
    category: "Technical",
    tags: ["sizes", "formats", "output"],
  },
  {
    id: "ios-requirements",
    question: "What are the specific requirements for iOS app icons?",
    answer:
      "iOS app icons must be 1024×1024px in PNG format without transparency or alpha channels. Apple automatically applies corner radius, so your icon should be square. The icon must be high-quality, represent your app's functionality, and not include Apple hardware or software elements. Additional sizes are generated automatically for different contexts like Settings (29×29pt) and Spotlight (40×40pt).",
    category: "Platform Specific",
    tags: ["ios", "requirements", "app-store"],
  },
  {
    id: "android-adaptive-icons",
    question: "How do Android adaptive icons work?",
    answer:
      "Android adaptive icons consist of two layers: a foreground layer (your main icon design) and a background layer (solid color or simple pattern). The system applies various masks (circle, square, rounded square) depending on the device manufacturer. Our tool automatically creates adaptive icons with a safe zone of 66×66dp in the center where your important design elements are guaranteed to be visible.",
    category: "Platform Specific",
    tags: ["android", "adaptive-icons", "material-design"],
  },
  {
    id: "background-color-selection",
    question: "How does the automatic background color detection work?",
    answer:
      "Our advanced color analysis algorithm examines your uploaded image to identify dominant colors, edge colors, and suggests optimal background colors for adaptive icons. The system analyzes color distribution, contrast ratios, and visual harmony to recommend colors that complement your icon design. You can also manually select from detected colors or use custom hex values.",
    category: "Features",
    tags: ["color-analysis", "background", "automation"],
  },
  {
    id: "expo-integration",
    question: "How do I integrate the generated icons into my Expo project?",
    answer:
      "After generating icons, download the ZIP file and extract it to your project's assets folder. Update your app.json configuration file with the icon paths: set 'icon' to './assets/icon.png', 'android.adaptiveIcon.foregroundImage' to './assets/adaptive-icon.png', and 'web.favicon' to './assets/favicon.png'. Run 'expo prebuild' to apply changes and test on your devices.",
    category: "Integration",
    tags: ["expo", "app.json", "configuration"],
  },
  {
    id: "app-store-submission",
    question: "Will these icons pass App Store and Google Play Store review?",
    answer:
      "Yes, our generated icons meet all technical requirements for both app stores. However, store approval also depends on your icon design following platform guidelines: icons must represent your app's functionality, be original artwork, and be appropriate for your target audience. We recommend reviewing Apple's Human Interface Guidelines and Google's Material Design guidelines for design best practices.",
    category: "App Store",
    tags: ["approval", "guidelines", "submission"],
  },
  {
    id: "icon-design-tips",
    question: "What makes a good app icon design?",
    answer:
      "Effective app icons are simple, memorable, and work at all sizes. Use bold, recognizable imagery with high contrast. Avoid fine details that disappear when scaled down. Test your icon at the smallest size (29×29px) to ensure legibility. Maintain consistent branding across platforms while adapting to each platform's design language. Consider cultural differences if targeting global markets.",
    category: "Design",
    tags: ["design-tips", "best-practices", "branding"],
  },
  {
    id: "troubleshooting-upload",
    question: "Why is my image upload failing?",
    answer:
      "Upload failures typically occur due to: file size exceeding 10MB limit, unsupported file format, corrupted image file, or network connectivity issues. Ensure your image is in PNG, JPG, JPEG, or SVG format and under 10MB. Try refreshing the page and uploading again. If issues persist, try converting your image to PNG format using an image editor.",
    category: "Troubleshooting",
    tags: ["upload-issues", "file-size", "format-errors"],
  },
  {
    id: "icon-quality-optimization",
    question: "How can I ensure the best quality for my generated icons?",
    answer:
      "For optimal results: start with a high-resolution source image (1024×1024px or larger), use PNG format for crisp edges, ensure your design has sufficient contrast, avoid very thin lines or small text, and test the generated icons on actual devices. Consider the safe zone for Android adaptive icons and ensure important elements are within the center 66×66dp area.",
    category: "Quality",
    tags: ["optimization", "quality", "best-practices"],
  },
  {
    id: "batch-processing",
    question: "Can I generate icons for multiple apps at once?",
    answer:
      "Currently, our tool processes one app icon at a time to ensure optimal quality and allow for individual customization of background colors and settings. For multiple apps, you'll need to process each icon separately. We're considering batch processing features for future updates based on user feedback.",
    category: "Features",
    tags: ["batch-processing", "multiple-apps", "workflow"],
  },
  {
    id: "api-access",
    question: "Is there an API available for automated icon generation?",
    answer:
      "Yes, we provide API endpoints for programmatic access. POST to /api/generate-icons with your image file to generate icons, and use /api/download-icons to get a ZIP file of all generated icons. This allows integration into CI/CD pipelines and automated workflows. Rate limiting applies to ensure service quality for all users.",
    category: "API",
    tags: ["api", "automation", "integration"],
  },
  {
    id: "cost-and-pricing",
    question: "Is Expo Icon Generator free to use?",
    answer:
      "Yes, Expo Icon Generator is completely free to use with no hidden costs, registration requirements, or usage limits. We believe in supporting the developer community by providing high-quality tools that help streamline the app development process. The service is supported through optional donations and community contributions.",
    category: "Pricing",
    tags: ["free", "pricing", "cost"],
  },
  {
    id: "privacy-and-security",
    question: "What happens to my uploaded images?",
    answer:
      "Your privacy is important to us. Uploaded images are processed in real-time and are not stored on our servers permanently. Images are temporarily cached during processing and automatically deleted after generation is complete. We don't collect, store, or share your image data with third parties.",
    category: "Privacy",
    tags: ["privacy", "security", "data-protection"],
  },
];

const categories = [
  "All",
  "General",
  "Technical",
  "Platform Specific",
  "Features",
  "Integration",
  "App Store",
  "Design",
  "Troubleshooting",
  "Quality",
  "API",
  "Pricing",
  "Privacy",
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <HelpCircle className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to common questions about icon generation, Expo
            development, and platform requirements. Can&apos;t find what
            you&apos;re looking for?
            <Link
              href="https://github.com/WebNaresh/expo-icon-generator/discussions"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {" "}
              Ask the community
            </Link>
            .
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions, answers, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => {
                const isExpanded = expandedItems.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleExpanded(faq.id)}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {faq.category}
                            </span>
                            <div className="flex gap-1">
                              {faq.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-200 pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-lg mb-6 opacity-90">
            Explore our comprehensive guides and tutorials, or join our
            community discussions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Read Our Blog
            </Link>
            <Link
              href="/tutorials"
              className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              View Tutorials
            </Link>
            <Link
              href="https://github.com/WebNaresh/expo-icon-generator/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              Community Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
