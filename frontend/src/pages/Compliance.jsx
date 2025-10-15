import React from 'react';
import { Shield, CheckCircle, FileText, Award, Users, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Compliance = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const complianceItems = [
    {
      icon: Shield,
      title: "SEBI Research Analyst Regulations Compliance",
      description: "Complies with SEBI Research Analyst Regulations, 2014 (and amendments), and all relevant circulars",
      status: "compliant"
    },
    {
      icon: Users,
      title: "Qualification Requirements",
      description: "Principal officer and research staff meet certification and qualification requirements (Regulation 7)",
      status: "compliant"
    },
    {
      icon: Award,
      title: "Infrastructure Adequacy",
      description: "Infrastructure is adequate for research analyst activities",
      status: "compliant"
    },
    {
      icon: CheckCircle,
      title: "Fit and Proper Person Criteria",
      description: "Partners, directors, major shareholders, and key employees are considered 'fit and proper persons' as per SEBI criteria: integrity, honesty, ethical behavior, reputation, fairness, character",
      status: "compliant"
    },
    {
      icon: AlertTriangle,
      title: "Legal Disqualifications",
      description: "No criminal charges, restraining orders, or disqualifications as per SEBI requirements",
      status: "compliant"
    },
    {
      icon: FileText,
      title: "Dispute Resolution",
      description: "No pending or settled disputes in the last five years",
      status: "compliant"
    }
  ];

  const legalDisqualifications = [
    "Pending criminal cases",
    "Restraint orders",
    "Insolvency proceedings",
    "Conviction for moral turpitude",
    "Wilful defaulter status",
    "Fugitive economic offender status",
    "Any other disqualifications as per SEBI regulations"
  ];

  const businessCommitments = [
    {
      title: "Employment Separation",
      description: "Upon approval of Research Analyst License, full-time research analysts must resign from other employment"
    },
    {
      title: "Business Segregation",
      description: "Maintains arms-length and segregated relationships between research analyst business and other business activities. No commissions or referral fees are received for execution services"
    },
    {
      title: "Regulatory Deposits",
      description: "Committed to maintaining regulatory deposits as required by the Board"
    }
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Compliance & Declarations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparency and regulatory compliance are the cornerstones of our business operations. 
            We maintain the highest standards of integrity and adherence to SEBI regulations.
          </p>
        </motion.div>

        {/* SEBI Registration Banner */}
        <motion.div 
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white mb-16"
          variants={fadeInUp}
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Shield className="w-12 h-12" />
            <div className="text-center">
              <h2 className="text-3xl font-bold">SEBI Registered</h2>
              <p className="text-green-100">Investment Adviser & Research Analyst</p>
            </div>
          </div>
          <p className="text-center text-green-100 max-w-2xl mx-auto">
            Bullgains Research is a SEBI-registered Investment Adviser and Research Analyst, 
            committed to maintaining the highest standards of regulatory compliance and client protection.
          </p>
        </motion.div>

        {/* Compliance Items */}
        <motion.div 
          className="mb-16"
          variants={staggerChildren}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Regulatory Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-green-600">Compliant</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Legal Disqualifications */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Legal Disqualifications Declaration</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-xl font-semibold text-red-800">No Legal Disqualifications</h3>
            </div>
            <p className="text-red-700 mb-4">
              We declare that there are no pending legal disqualifications including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {legalDisqualifications.map((item, index) => (
                <li key={index} className="flex items-center text-red-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Business Commitments */}
        <motion.div 
          className="mb-16"
          variants={staggerChildren}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Business Commitments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessCommitments.map((commitment, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{commitment.title}</h3>
                <p className="text-gray-600 text-sm">{commitment.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regulatory Submission */}
        <motion.div 
          className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center"
          variants={fadeInUp}
        >
          <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Submission</h2>
          <p className="text-gray-600 mb-4">
            This declaration has been submitted to SEBI Market Intermediaries Regulation Supervision Department 
            with a copy marked to BSE Ltd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">Submitted to</p>
              <p className="font-semibold text-gray-900">SEBI Market Intermediaries Regulation Supervision Department</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-sm text-gray-500">Copy marked to</p>
              <p className="font-semibold text-gray-900">BSE Ltd.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Compliance;

