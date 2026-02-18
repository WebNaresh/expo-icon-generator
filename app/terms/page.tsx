import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Scale, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export const metadata: Metadata = {
  alternates: {
    canonical: "/terms",
  },
  title: "Terms and Conditions | Expo Icon Generator",
  description: "Terms and Conditions for using Expo Icon Generator. Legal terms, usage rights, and service conditions for our icon generation tool.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "expo icon generator terms",
    "usage rights",
    "legal terms",
    "service agreement"
  ],
  openGraph: {
    title: "Terms and Conditions | Expo Icon Generator",
    description: "Terms and Conditions for Expo Icon Generator - Legal terms and usage rights",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gray-800 p-4">
              <FileText className="h-12 w-12 text-sky-400" />
            </div>
          </div>
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-400">
            Please read these terms and conditions carefully before using Expo Icon Generator. By using our service, you agree to be bound by these terms.
          </p>
          <div className="text-sm text-gray-500">
            <Calendar className="mr-2 inline h-4 w-4" />
            Last updated: January 2024
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl">
          <div className="space-y-8 rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-lg">

            {/* Acceptance of Terms */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
              </div>

              <p className="mb-4 text-gray-400">
                By accessing and using Expo Icon Generator (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <div className="rounded-lg bg-gray-800 p-4">
                <p className="text-gray-400">
                  <strong className="text-white">Effective Date:</strong> These terms are effective as of January 2024 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Service Description</h2>

              <p className="mb-4 text-gray-400">
                Expo Icon Generator is a free web-based tool that allows users to:
              </p>

              <ul className="mb-4 space-y-2">
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-400">Upload image files for icon generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-400">Generate platform-specific app icons for iOS, Android, and web</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-400">Download generated icons in various formats and sizes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500"></div>
                  <span className="text-gray-400">Access educational content about app development and icon design</span>
                </li>
              </ul>

              <p className="text-gray-400">
                The Service is provided &quot;as is&quot; without any warranties, expressed or implied.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <Scale className="h-6 w-6 text-sky-400" />
                <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-gray-800 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white">Content Ownership</h3>
                  <p className="text-gray-400">
                    You must own or have the legal right to use any images you upload to our service. You are solely responsible for ensuring that your uploaded content does not infringe on any third-party rights, including copyrights, trademarks, or other intellectual property rights.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-800 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white">Prohibited Content</h3>
                  <p className="mb-2 text-gray-400">You agree not to upload content that:</p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• Contains illegal, harmful, or offensive material</li>
                    <li>• Infringes on intellectual property rights</li>
                    <li>• Contains malware, viruses, or malicious code</li>
                    <li>• Violates any applicable laws or regulations</li>
                    <li>• Contains personal information of others without consent</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-800 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white">Acceptable Use</h3>
                  <p className="text-gray-400">
                    You agree to use the Service only for lawful purposes and in accordance with these Terms. You will not attempt to interfere with, compromise the security of, or decipher any transmissions to or from the servers running the Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Intellectual Property Rights</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-800 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white">Your Content</h3>
                  <p className="text-gray-400">
                    You retain all rights to the images you upload and the icons generated from them. We do not claim ownership of your content or generated icons.
                  </p>
                </div>

                <div className="rounded-lg bg-gray-800 p-4">
                  <h3 className="mb-2 text-lg font-semibold text-white">Our Service</h3>
                  <p className="text-gray-400">
                    The Service, including its design, functionality, and underlying technology, is owned by us and protected by intellectual property laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Disclaimers and Limitations</h2>
              </div>

              <div className="mb-4 border-l-4 border-yellow-500 bg-gray-800 p-4">
                <h3 className="mb-2 text-lg font-semibold text-white">Service Availability</h3>
                <p className="text-gray-400">
                  We strive to maintain high availability but do not guarantee that the Service will be available 100% of the time. The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>

              <div className="mb-4 border-l-4 border-yellow-500 bg-gray-800 p-4">
                <h3 className="mb-2 text-lg font-semibold text-white">No Warranties</h3>
                <p className="text-gray-400">
                  The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 bg-gray-800 p-4">
                <h3 className="mb-2 text-lg font-semibold text-white">Limitation of Liability</h3>
                <p className="text-gray-400">
                  In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Privacy and Data Handling</h2>

              <p className="mb-4 text-gray-400">
                Your privacy is important to us. Our data handling practices are described in detail in our <Link href="/privacy" className="font-medium text-sky-400 hover:text-sky-300">Privacy Policy</Link>.
              </p>

              <div className="rounded-lg bg-gray-800 p-4">
                <h3 className="mb-2 text-lg font-semibold text-white">Key Points:</h3>
                <ul className="space-y-1 text-gray-400">
                  <li>• Uploaded images are processed temporarily and automatically deleted</li>
                  <li>• We do not store your images permanently</li>
                  <li>• Anonymous usage analytics help us improve the service</li>
                  <li>• We use industry-standard security measures</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Termination</h2>

              <p className="mb-4 text-gray-400">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>

              <p className="text-gray-400">
                You may discontinue use of the Service at any time. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Changes to Terms</h2>

              <p className="mb-4 text-gray-400">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>

              <p className="text-gray-400">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Governing Law</h2>

              <p className="text-gray-400">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which the service is operated, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the Service will be resolved through appropriate legal channels.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">Contact Information</h2>

              <div className="rounded-lg bg-gray-800 p-6">
                <p className="mb-4 text-gray-400">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>

                <div className="space-y-2">
                  <p className="text-gray-400">
                    <strong className="text-white">GitHub Issues:</strong> <Link href="https://github.com/WebNaresh/expo-icon-generator/issues" className="text-sky-400 hover:text-sky-300">Report issues or concerns</Link>
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-white">GitHub Discussions:</strong> <Link href="https://github.com/WebNaresh/expo-icon-generator/discussions" className="text-sky-400 hover:text-sky-300">General questions</Link>
                  </p>
                  <p className="text-gray-400">
                    <strong className="text-white">Developer:</strong> <Link href="https://github.com/WebNaresh" className="text-sky-400 hover:text-sky-300">Naresh Bhosale</Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="border-t border-gray-700 pt-6">
              <div className="rounded-lg bg-gray-800 p-6 text-center">
                <p className="text-gray-400">
                  <strong className="text-white">By using Expo Icon Generator, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 space-x-4 text-center">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-200"
          >
            View Privacy Policy
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 font-medium text-gray-300 transition-colors hover:bg-gray-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
