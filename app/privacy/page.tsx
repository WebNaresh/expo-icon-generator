import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, Lock, Database, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Expo Icon Generator",
  description: "Privacy Policy for Expo Icon Generator. Learn how we collect, use, and protect your data when using our icon generation service.",
  keywords: [
    "privacy policy",
    "data protection",
    "expo icon generator privacy",
    "user data",
    "privacy rights",
    "data collection"
  ],
  openGraph: {
    title: "Privacy Policy | Expo Icon Generator",
    description: "Privacy Policy for Expo Icon Generator - Learn how we protect your data",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-blue-100 p-4">
              <Shield className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use Expo Icon Generator.
          </p>
          <div className="text-sm text-gray-500">
            <Calendar className="mr-2 inline h-4 w-4" />
            Last updated: January 2024
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8 rounded-xl bg-white p-8 shadow-lg">
            
            {/* Information We Collect */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <Database className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Images You Upload</h3>
                  <p className="text-gray-700">
                    When you use our icon generation service, you upload image files that are processed to create app icons. These images are temporarily stored during processing and automatically deleted after generation is complete.
                  </p>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Usage Analytics</h3>
                  <p className="text-gray-700">
                    We collect anonymous usage statistics to improve our service, including page views, feature usage, and performance metrics. This data does not include personal information or uploaded content.
                  </p>
                </div>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Technical Information</h3>
                  <p className="text-gray-700">
                    We automatically collect technical information such as your IP address, browser type, device information, and operating system to ensure our service works properly and to prevent abuse.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong>Service Provision:</strong> To process your uploaded images and generate app icons according to your specifications.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong>Service Improvement:</strong> To analyze usage patterns and improve our features, performance, and user experience.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong>Security:</strong> To detect and prevent fraud, abuse, and security threats to our service and users.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.
                  </span>
                </li>
              </ul>
            </section>

            {/* Data Protection */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Data Protection & Security</h2>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Encryption</h3>
                  <p className="text-gray-700">
                    All data transmission is encrypted using industry-standard SSL/TLS protocols. Your uploaded images are processed securely and never stored permanently.
                  </p>
                </div>
                
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Temporary Storage</h3>
                  <p className="text-gray-700">
                    Uploaded images are temporarily cached during processing and automatically deleted within 24 hours. We do not maintain permanent copies of your content.
                  </p>
                </div>
                
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Access Controls</h3>
                  <p className="text-gray-700">
                    Access to our systems is restricted to authorized personnel only, and all access is logged and monitored for security purposes.
                  </p>
                </div>
                
                <div className="rounded-lg bg-purple-50 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Regular Audits</h3>
                  <p className="text-gray-700">
                    We regularly review and update our security practices to ensure they meet current industry standards and best practices.
                  </p>
                </div>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Third-Party Services</h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Google Analytics</h3>
                  <p className="text-gray-700">
                    We use Google Analytics to understand how users interact with our service. Google Analytics collects anonymous usage data. You can opt out of Google Analytics tracking by using the Google Analytics Opt-out Browser Add-on.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Vercel Hosting</h3>
                  <p className="text-gray-700">
                    Our service is hosted on Vercel, which may collect technical information for hosting and performance purposes. Vercel&apos;s privacy policy applies to their data collection practices.
                  </p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Google AdSense</h3>
                  <p className="text-gray-700">
                    We use Google AdSense to display advertisements. Google may use cookies and other tracking technologies to serve personalized ads. You can manage your ad preferences through Google&apos;s Ad Settings.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Your Rights</h2>
              
              <div className="rounded-lg bg-blue-50 p-6">
                <p className="mb-4 text-gray-700">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Right to access your personal information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Right to correct inaccurate information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Right to delete your personal information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Right to restrict processing of your information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-gray-700">Right to data portability</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
              
              <p className="mb-4 text-gray-700">
                We use cookies and similar tracking technologies to improve your experience and analyze usage patterns. Types of cookies we use:
              </p>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Essential Cookies</h3>
                  <p className="text-sm text-gray-700">Required for the service to function properly</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Analytics Cookies</h3>
                  <p className="text-sm text-gray-700">Help us understand how users interact with our service</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-900">Advertising Cookies</h3>
                  <p className="text-sm text-gray-700">Used to display relevant advertisements</p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <Mail className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              
              <div className="rounded-lg bg-red-50 p-6">
                <p className="mb-4 text-gray-700">
                  If you have questions about this Privacy Policy or want to exercise your rights, please contact us:
                </p>
                
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>GitHub Issues:</strong> <Link href="https://github.com/WebNaresh/expo-icon-generator/issues" className="text-blue-600 hover:text-blue-700">Report privacy concerns</Link>
                  </p>
                  <p className="text-gray-700">
                    <strong>GitHub Discussions:</strong> <Link href="https://github.com/WebNaresh/expo-icon-generator/discussions" className="text-blue-600 hover:text-blue-700">General questions</Link>
                  </p>
                  <p className="text-gray-700">
                    <strong>Developer:</strong> <Link href="https://github.com/WebNaresh" className="text-blue-600 hover:text-blue-700">Naresh Bhosale</Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Policy Updates</h2>
              
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </section>

          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
