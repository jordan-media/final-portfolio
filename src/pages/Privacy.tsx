// src/pages/Privacy.tsx
import React from 'react';

const Privacy: React.FC = () => {
  const lastUpdated = "January 15, 2025";
  const effectiveDate = "January 15, 2025";

  return (
    <div className="min-h-screen bg-white font-space-grotesk">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500">
            <strong>Effective Date:</strong> {effectiveDate} | <strong>Last Updated:</strong> {lastUpdated}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Quick Summary */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-cyan-900 mb-3">Quick Summary</h2>
          <ul className="text-cyan-800 space-y-2">
            <li>• We collect minimal personal information, only what's necessary</li>
            <li>• We never sell your personal data to third parties</li>
            <li>• You can request deletion of your data at any time</li>
            <li>• We use industry-standard security measures to protect your information</li>
          </ul>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <a href="#information-collected" className="text-cyan-600 hover:text-cyan-700 transition-colors">1. Information We Collect</a>
            <a href="#how-we-use" className="text-cyan-600 hover:text-cyan-700 transition-colors">2. How We Use Information</a>
            <a href="#information-sharing" className="text-cyan-600 hover:text-cyan-700 transition-colors">3. Information Sharing</a>
            <a href="#data-security" className="text-cyan-600 hover:text-cyan-700 transition-colors">4. Data Security</a>
            <a href="#your-rights" className="text-cyan-600 hover:text-cyan-700 transition-colors">5. Your Rights</a>
            <a href="#cookies" className="text-cyan-600 hover:text-cyan-700 transition-colors">6. Cookies & Tracking</a>
            <a href="#international-users" className="text-cyan-600 hover:text-cyan-700 transition-colors">7. International Users</a>
            <a href="#children" className="text-cyan-600 hover:text-cyan-700 transition-colors">8. Children's Privacy</a>
            <a href="#updates" className="text-cyan-600 hover:text-cyan-700 transition-colors">9. Policy Updates</a>
            <a href="#contact" className="text-cyan-600 hover:text-cyan-700 transition-colors">10. Contact Information</a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-none">
          
          <section id="information-collected" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-800 mb-2">Information You Provide</h3>
            <p className="text-gray-700 mb-4">
              When you contact us through our website, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name and email address (when you contact us)</li>
              <li>Any information you choose to include in your messages</li>
              <li>Newsletter subscription information (if applicable)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mb-2">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>IP address and general location information</li>
              <li>Browser type and version</li>
              <li>Device information and screen resolution</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
            </ul>
          </section>

          <section id="how-we-use" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use collected information to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website functionality and user experience</li>
              <li>Send newsletters or updates (only if you've subscribed)</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Prevent fraud and ensure website security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section id="information-sharing" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              <strong>We do not sell, rent, or trade your personal information.</strong> We may share information only in these limited circumstances:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our website (e.g., hosting, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
            </ul>
          </section>

          <section id="data-security" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure hosting infrastructure</li>
              <li>Regular security updates and monitoring</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Regular backup and disaster recovery procedures</li>
            </ul>
            <p className="text-gray-700 mb-4">
              While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to improve our protective measures.
            </p>
          </section>

          <section id="your-rights" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Privacy Rights</h2>
            <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Universal Rights</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li><strong>Access:</strong> Request a copy of the personal information we have about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Additional Rights for EU/UK Users (GDPR)</h3>
              <ul className="list-disc pl-6 text-blue-700">
                <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                <li><strong>Restriction:</strong> Request limitation of processing under certain circumstances</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for consent-based processing</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-medium text-purple-800 mb-2">Additional Rights for California Users (CCPA)</h3>
              <ul className="list-disc pl-6 text-purple-700">
                <li><strong>Know:</strong> Right to know what personal information is collected and how it's used</li>
                <li><strong>Delete:</strong> Right to delete personal information</li>
                <li><strong>Opt-out of Sale:</strong> Right to opt-out of the sale of personal information</li>
                <li><strong>Non-discrimination:</strong> Right not to be discriminated against for exercising privacy rights</li>
              </ul>
            </div>

            <p className="text-gray-700">
              To exercise any of these rights, please contact us at <a href="mailto:coastalifee@icloud.com" className="text-cyan-600 hover:text-cyan-700">coastalifee@icloud.com</a>. We will respond within the timeframes required by applicable law.
            </p>
          </section>

          <section id="cookies" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your browsing experience:
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Cookie Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Essential</td>
                    <td className="border border-gray-300 px-4 py-2">Website functionality and security</td>
                    <td className="border border-gray-300 px-4 py-2">Session/1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Analytics</td>
                    <td className="border border-gray-300 px-4 py-2">Understanding website usage patterns</td>
                    <td className="border border-gray-300 px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Performance</td>
                    <td className="border border-gray-300 px-4 py-2">Optimizing website speed and functionality</td>
                    <td className="border border-gray-300 px-4 py-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section id="international-users" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. International Users</h2>
            <p className="text-gray-700 mb-4">
              Our website is hosted in Canada. If you are accessing our site from outside Canada, please note that your information may be transferred to, stored, and processed in Canada where our servers are located and our central database is operated.
            </p>
            <p className="text-gray-700 mb-4">
              Canada has been recognized by the European Commission as providing adequate protection for personal data. We comply with applicable international privacy laws including GDPR for EU users and CCPA for California residents.
            </p>
          </section>

          <section id="children" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately so we can delete such information.
            </p>
          </section>

          <section id="updates" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Policy Updates</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Posting the updated policy on our website</li>
              <li>Updating the "Last Updated" date at the top of this policy</li>
              <li>Sending email notification for significant changes (if you've provided your email)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Your continued use of our website after any changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section id="contact" className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Email</h3>
                  <a href="mailto:coastalifee@icloud.com" className="text-cyan-600 hover:text-cyan-700 transition-colors">
                    coastalifee@icloud.com
                  </a>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Business Name</h3>
                  <p className="text-gray-700">Jordan Media Creations</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-700">Vancouver, British Columbia, Canada</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Response Time</h3>
                  <p className="text-gray-700">We aim to respond within 48 hours</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer Note */}
        <div className="border-t border-gray-200 pt-8 mt-12">
          <p className="text-sm text-gray-500 text-center">
            This Privacy Policy was last updated on {lastUpdated}. We are committed to protecting your privacy and will continue to update our practices to meet the highest standards.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;