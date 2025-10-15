import React from 'react';
import { Shield, Eye, Lock, Database, User } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are committed to protecting your privacy and personal information.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Database className="w-6 h-6 text-blue-500 mr-2" />
              Information We Collect
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We collect information that you provide directly to us, such as when you create an account, 
                subscribe to our services, or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal information (name, email address, phone number)</li>
                <li>Account credentials and preferences</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication records and correspondence</li>
                <li>Investment preferences and risk tolerance</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-6 h-6 text-green-500 mr-2" />
              How We Use Your Information
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our research and advisory services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you research reports and market updates</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Protect against fraud and unauthorized access</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-6 h-6 text-red-500 mr-2" />
              Information Sharing and Disclosure
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>With trusted service providers who assist in our operations</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                These technologies help us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve website functionality and performance</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences, but disabling cookies 
                may affect the functionality of our website.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="w-6 h-6 text-purple-500 mr-2" />
              Your Rights
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                You have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to access and review your personal information</li>
                <li>Right to correct or update inaccurate information</li>
                <li>Right to request deletion of your personal information</li>
                <li>Right to restrict or object to certain processing activities</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided below.
              </p>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes 
                outlined in this Privacy Policy, unless a longer retention period is required by law. 
                When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the 
                privacy practices or content of these external sites. We encourage you to review the 
                privacy policies of any third-party sites you visit.
              </p>
            </div>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or applicable laws. We will notify you of any material changes by posting the updated 
                policy on our website and updating the "Last Updated" date.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@bullgains.in<br />
                <strong>Phone:</strong> +91 7903908955,<br />
                <strong>Address:</strong> No. 631, Brahmpur, Po-New Jaganpura, Ps-Ramkrishna Nagar, Patna, Bihar – 800027
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-sm text-gray-500 text-center pt-6 border-t">
            Last updated: {new Date().toLocaleDateString('en-IN')}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
