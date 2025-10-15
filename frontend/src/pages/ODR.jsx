import React from 'react';
import { Scale, Users, Clock, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const ODR = () => {
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
              <Scale className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Online Dispute Resolution (ODR)</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to resolving disputes through online mechanisms.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* What is ODR */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-2" />
              What is Online Dispute Resolution (ODR)?
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Online Dispute Resolution (ODR) is a mechanism for resolving disputes through online 
                platforms, providing a faster, more cost-effective, and accessible alternative to 
                traditional court proceedings.
              </p>
              <p>
                ODR uses technology to facilitate communication between parties and mediators/arbitrators 
                to resolve disputes efficiently and fairly.
              </p>
            </div>
          </section>

          {/* Benefits of ODR */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of ODR</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Speed and Efficiency
                </h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>• Faster resolution compared to courts</li>
                  <li>• Reduced waiting times</li>
                  <li>• Streamlined processes</li>
                  <li>• Quick communication channels</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Accessibility
                </h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Available 24/7 online</li>
                  <li>• No geographical barriers</li>
                  <li>• Easy to use platforms</li>
                  <li>• Multiple language support</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Cost-Effective
                </h3>
                <ul className="text-purple-700 space-y-2 text-sm">
                  <li>• Lower costs than litigation</li>
                  <li>• Reduced legal fees</li>
                  <li>• No travel expenses</li>
                  <li>• Transparent fee structure</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Confidentiality
                </h3>
                <ul className="text-yellow-700 space-y-2 text-sm">
                  <li>• Private dispute resolution</li>
                  <li>• Confidential proceedings</li>
                  <li>• Secure data handling</li>
                  <li>• Protection of sensitive information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* ODR Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ODR Process</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our ODR process follows these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Submission of dispute through online platform</li>
                <li>Initial assessment and case acceptance</li>
                <li>Assignment of neutral mediator/arbitrator</li>
                <li>Online communication and document exchange</li>
                <li>Mediation/arbitration sessions</li>
                <li>Resolution and settlement agreement</li>
                <li>Implementation of resolution</li>
              </ol>
            </div>
          </section>

          {/* Types of Disputes */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Disputes Covered</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                ODR is suitable for resolving various types of disputes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service delivery issues</li>
                <li>Billing and payment disputes</li>
                <li>Contract interpretation disputes</li>
                <li>Quality of service complaints</li>
                <li>Data privacy and security issues</li>
                <li>Regulatory compliance matters</li>
                <li>Investment advisory disputes</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                To initiate an ODR process or for more information, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@bullgains.in<br />
                <strong>Phone:</strong> +91 7903908955<br />
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

export default ODR;
