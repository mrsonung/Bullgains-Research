import React from 'react';
import { FileText, Scale, AlertTriangle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const TermsConditions = () => {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Scale className="w-6 h-6 text-blue-500 mr-2" />
              Acceptance of Terms
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                By accessing and using the services provided by Bullgains Research ("the Company"), 
                you agree to be bound by these Terms and Conditions. If you do not agree to these terms, 
                please do not use our services.
              </p>
              <p>
                These terms constitute a legally binding agreement between you and Bullgains Research. 
                We reserve the right to modify these terms at any time, and your continued use of our 
                services constitutes acceptance of any changes.
              </p>
            </div>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research provides investment research, market analysis, and financial advisory 
                services to clients. Our services include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Equity research and analysis</li>
                <li>Market commentary and insights</li>
                <li>Investment recommendations</li>
                <li>Financial advisory services</li>
                <li>Educational content and resources</li>
              </ul>
            </div>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-green-500 mr-2" />
              User Responsibilities
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                As a user of our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not share your account credentials with others</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our services for any fraudulent or illegal activities</li>
                <li>Respect intellectual property rights</li>
              </ul>
            </div>
          </section>

          {/* Investment Risks */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              Investment Risks
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Risk Warning</h3>
                  <p className="text-red-700">
                    All investments carry risk. Past performance is not indicative of future results. 
                    You should carefully consider your investment objectives and risk tolerance before 
                    making any investment decisions.
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                You acknowledge and agree that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All investment decisions are your sole responsibility</li>
                <li>We do not guarantee any specific returns or profits</li>
                <li>Market conditions can change rapidly and unpredictably</li>
                <li>You should seek independent financial advice before investing</li>
                <li>You understand the risks associated with your investments</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                To the maximum extent permitted by law, Bullgains Research shall not be liable for any 
                direct, indirect, incidental, special, consequential, or punitive damages arising from 
                your use of our services, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Investment losses or trading losses</li>
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Data loss or corruption</li>
                <li>Service interruptions or downtime</li>
                <li>Any other financial or non-financial losses</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                All content, materials, and intellectual property on our website and in our research 
                reports are owned by Bullgains Research or our licensors. You may not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Copy, reproduce, or distribute our content without permission</li>
                <li>Use our content for commercial purposes</li>
                <li>Modify or create derivative works from our content</li>
                <li>Remove or alter any copyright notices</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We reserve the right to terminate or suspend your access to our services at any time, 
                with or without notice, for any reason, including violation of these terms.
              </p>
              <p>
                Upon termination, your right to use our services will cease immediately, and you must 
                stop all use of our services and destroy any copies of our content in your possession.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                These Terms and Conditions are governed by the laws of India. Any disputes arising from 
                these terms or your use of our services shall be subject to the exclusive jurisdiction 
                of the courts in Patna, Bihar.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@bullgains.in<br />
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

export default TermsConditions;
