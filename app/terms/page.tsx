import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Scale, AlertTriangle, CheckCircle, Calendar } from "lucide-react";

export const metadata: Metadata = {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <FileText className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Please read these terms and conditions carefully before using Expo Icon Generator. By using our service, you agree to be bound by these terms.
          </p>
          <div className="text-sm text-gray-500">
            <Calendar className="w-4 h-4 inline mr-2" />
            Last updated: January 2024
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            
            {/* Acceptance of Terms */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                By accessing and using Expo Icon Generator (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-gray-700">
                  <strong>Effective Date:</strong> These terms are effective as of January 2024 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
              
              <p className="text-gray-700 mb-4">
                Expo Icon Generator is a free web-based tool that allows users to:
              </p>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Upload image files for icon generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Generate platform-specific app icons for iOS, Android, and web</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Download generated icons in various formats and sizes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">Access educational content about app development and icon design</span>
                </li>
              </ul>
              
              <p className="text-gray-700">
                The Service is provided &quot;as is&quot; without any warranties, expressed or implied.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Ownership</h3>
                  <p className="text-gray-700">
                    You must own or have the legal right to use any images you upload to our service. You are solely responsible for ensuring that your uploaded content does not infringe on any third-party rights, including copyrights, trademarks, or other intellectual property rights.
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Prohibited Content</h3>
                  <p className="text-gray-700 mb-2">You agree not to upload content that:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Contains illegal, harmful, or offensive material</li>
                    <li>• Infringes on intellectual property rights</li>
                    <li>• Contains malware, viruses, or malicious code</li>
                    <li>• Violates any applicable laws or regulations</li>
                    <li>• Contains personal information of others without consent</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Acceptable Use</h3>
                  <p className="text-gray-700">
                    You agree to use the Service only for lawful purposes and in accordance with these Terms. You will not attempt to interfere with, compromise the security of, or decipher any transmissions to or from the servers running the Service.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Content</h3>
                  <p className="text-gray-700">
                    You retain all rights to the images you upload and the icons generated from them. We do not claim ownership of your content or generated icons.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Service</h3>
                  <p className="text-gray-700">
                    The Service, including its design, functionality, and underlying technology, is owned by us and protected by intellectual property laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimers */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Disclaimers and Limitations</h2>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Availability</h3>
                <p className="text-gray-700">
                  We strive to maintain high availability but do not guarantee that the Service will be available 100% of the time. The Service may be temporarily unavailable due to maintenance, updates, or technical issues.
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Warranties</h3>
                <p className="text-gray-700">
                  The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Limitation of Liability</h3>
                <p className="text-gray-700">
                  In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy and Data Handling</h2>
              
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our data handling practices are described in detail in our <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</Link>.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Points:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Uploaded images are processed temporarily and automatically deleted</li>
                  <li>• We do not store your images permanently</li>
                  <li>• Anonymous usage analytics help us improve the service</li>
                  <li>• We use industry-standard security measures</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <p className="text-gray-700">
                You may discontinue use of the Service at any time. Upon termination, your right to use the Service will cease immediately.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              
              <p className="text-gray-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              </p>
              
              <p className="text-gray-700">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              
              <p className="text-gray-700">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which the service is operated, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of the Service will be resolved through appropriate legal channels.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              
              <div className="bg-green-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>GitHub Issues:</strong> <Link href="https://github.com/WebNaresh/expo-icon-generator/issues" className="text-blue-600 hover:text-blue-700">Report issues or concerns</Link>
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

            {/* Acknowledgment */}
            <section className="border-t border-gray-200 pt-6">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <p className="text-gray-700">
                  <strong>By using Expo Icon Generator, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
                </p>
              </div>
            </section>

          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12 space-x-4">
          <Link 
            href="/privacy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View Privacy Policy
          </Link>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
