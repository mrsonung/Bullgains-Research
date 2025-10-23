import React from 'react';
import { Users, Shield, CheckCircle, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const InvestorCharter = () => {
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
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Investor Charter</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to protecting investor interests and ensuring fair practices.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Our Commitment */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-blue-500 mr-2" />
              Our Commitment to Investors
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research is committed to protecting the interests of our clients and ensuring 
                fair, transparent, and ethical practices in all our dealings. This Investor Charter 
                outlines our commitment to you.
              </p>
            </div>
          </section>

          {/* Rights of Investors */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rights of Investors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Right to Information
                </h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Access to complete and accurate information</li>
                  <li>• Transparent fee structure and charges</li>
                  <li>• Clear explanation of risks involved</li>
                  <li>• Regular updates on your investments</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Right to Redressal
                </h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Grievance redressal mechanism</li>
                  <li>• Fair and timely resolution of complaints</li>
                  <li>• Escalation procedures</li>
                  <li>• Access to regulatory authorities</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Right to Privacy
                </h3>
                <ul className="text-purple-700 space-y-2 text-sm">
                  <li>• Protection of personal information</li>
                  <li>• Confidentiality of financial data</li>
                  <li>• Secure data handling practices</li>
                  <li>• Compliance with privacy laws</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Right to Fair Treatment
                </h3>
                <ul className="text-yellow-700 space-y-2 text-sm">
                  <li>• Non-discriminatory practices</li>
                  <li>• Fair and transparent pricing</li>
                  <li>• Professional service standards</li>
                  <li>• Respectful communication</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Our Obligations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Obligations</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We commit to fulfilling the following obligations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and timely research and analysis</li>
                <li>Maintain confidentiality of client information</li>
                <li>Ensure fair and transparent pricing</li>
                <li>Provide clear and understandable communications</li>
                <li>Resolve grievances promptly and fairly</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain professional standards and ethics</li>
                <li>Provide regular updates and market insights</li>
              </ul>
            </div>
          </section>

          {/* Grievance Redressal */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Grievance Redressal Mechanism</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to File a Grievance</h3>
              <ol className="text-gray-700 space-y-2 text-sm list-decimal list-inside">
                <li>Contact our customer support team</li>
                <li>Provide detailed description of the issue</li>
                <li>Submit relevant documents and evidence</li>
                <li>Receive acknowledgment within 24 hours</li>
                <li>Get resolution within 15 working days</li>
                <li>Escalate to management if not satisfied</li>
              </ol>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                If you are not satisfied with our resolution, you may escalate your grievance to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SEBI Investor Grievance Portal</li>
                <li>SEBI Helpline: 1800 266 7575</li>
                <li>SEBI Email: investorcomplaints@sebi.gov.in</li>
                <li>Local Consumer Forum</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                For any investor-related queries or grievances, please contact us at:
              </p>
              <p className="mt-4">
                  <strong>Email:</strong> support@bullgains.in<br />
                  <strong>Address:</strong> No. 631, Brahmpur, Po-New Jaganpura, Ps-Ramkrishna Nagar, Patna, Bihar  800027
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

export default InvestorCharter;
