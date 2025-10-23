import React from 'react';
import { FileText, Scale, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ODRCircular = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ODR Circular</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Regulatory guidelines and procedures for Online Dispute Resolution.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Regulatory Framework */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Scale className="w-6 h-6 text-blue-500 mr-2" />
              Regulatory Framework
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The Online Dispute Resolution (ODR) framework is governed by various regulatory 
                guidelines issued by SEBI and other relevant authorities. This circular outlines 
                the implementation of ODR mechanisms in accordance with regulatory requirements.
              </p>
              <p>
                Key regulatory references include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SEBI Circular on ODR Framework</li>
                <li>Consumer Protection Act, 2019</li>
                <li>Arbitration and Conciliation Act, 1996</li>
                <li>Information Technology Act, 2000</li>
                <li>SEBI Research Analyst Regulations, 2014</li>
              </ul>
            </div>
          </section>

          {/* ODR Implementation */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">ODR Implementation</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research has implemented ODR mechanisms in compliance with regulatory 
                requirements. Our ODR system includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Online dispute filing platform</li>
                <li>Automated case management system</li>
                <li>Secure communication channels</li>
                <li>Document management and sharing</li>
                <li>Video conferencing capabilities</li>
                <li>Digital signature and authentication</li>
                <li>Case tracking and status updates</li>
              </ul>
            </div>
          </section>

          {/* Eligibility Criteria */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Who Can Use ODR?</h3>
              <ul className="text-blue-700 space-y-2 text-sm">
                <li>• Registered clients of Bullgains Research</li>
                <li>• Individuals with valid service agreements</li>
                <li>• Parties involved in service-related disputes</li>
                <li>• Users with access to internet and digital devices</li>
              </ul>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Disputes eligible for ODR include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service delivery and quality issues</li>
                <li>Billing and payment disputes</li>
                <li>Contract interpretation matters</li>
                <li>Data privacy and security concerns</li>
                <li>Regulatory compliance issues</li>
                <li>Investment advisory disputes</li>
              </ul>
            </div>
          </section>

          {/* Process Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-green-500 mr-2" />
              Process Timeline
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The ODR process follows a structured timeline:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Dispute filing: Within 30 days of issue occurrence</li>
                <li>Initial response: Within 3 working days</li>
                <li>Case acceptance: Within 5 working days</li>
                <li>Mediator assignment: Within 7 working days</li>
                <li>Resolution period: Maximum 30 working days</li>
                <li>Implementation: Within 10 working days of resolution</li>
              </ol>
            </div>
          </section>

          {/* Mediator Qualifications */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 text-purple-500 mr-2" />
              Mediator Qualifications
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our ODR mediators are qualified professionals with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Minimum 5 years of experience in financial services</li>
                <li>Certification in mediation and arbitration</li>
                <li>Knowledge of SEBI regulations and guidelines</li>
                <li>Training in online dispute resolution</li>
                <li>Impartiality and conflict of interest management</li>
                <li>Continuous professional development</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                For ODR-related queries or to file a dispute, please contact us at:
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

export default ODRCircular;
