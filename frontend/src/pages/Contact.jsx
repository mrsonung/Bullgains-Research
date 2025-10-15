import React from 'react';
import { MapPin, Phone, Mail, Globe, Building, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for any inquiries about our research services, 
            investment guidance, or general questions about Bullgains Research.
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Registered Office */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Office</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">
                    No. 631, Brahmpur, Po-New Jaganpura,<br />
                    Ps-Ramkrishna Nagar, Patna, Bihar - 800027
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Phone Numbers</p>
                  <p className="text-gray-600">+91 7903908955</p>
                  
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">support@bullgains.in</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Website</p>
                  <p className="text-gray-600">www.bullgains.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Principal Place of Business */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Principal Place of Business</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Business Address</p>
                  <p className="text-gray-600">
                    No. 631, Brahmpur, Po-New Jaganpura,<br />
                    Ps-Ramkrishna Nagar, Patna, Bihar - 800027
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Business Contact</p>
                  <p className="text-gray-600">+91 7903908955</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Business Email</p>
                  <p className="text-gray-600">support@bullgains.in</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Business Website</p>
                  <p className="text-gray-600">www.bullgains.in</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Company Information */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Building className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">BSE Membership Number</p>
              <p className="font-semibold">6660</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">SEBI Research Analysts Registration</p>
              <p className="font-semibold">INH000022190</p>
            </div>
            {/* <div className="text-center">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              {/* <p className="text-sm text-blue-200">Corporate Identification Number</p>
              <p className="font-semibold">U72900MH2020PTC346236</p> 
            </div> */}
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">GSTIN</p>
              <p className="font-semibold">10ABEFB4164D1Z5</p>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership Details</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Partnership Deed Date:</span> 05 Feb 2025</p>
                <p><span className="font-medium">Firm Type:</span> Partnership Firm</p>
                <p><span className="font-medium">CEO & Founder:</span> Ashish Kumar Roushan</p>
                <p><span className="font-medium">Founder:</span> Navlesh Kumar Happy</p>
              </div>
            </div> */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Information</h3>
              <div className="space-y-2 text-gray-600">
                <p><span className="font-medium">Service Type:</span> SEBI Research Analyst Services</p>
                <p><span className="font-medium">Compliance:</span> SEBI Guidelines Adherent</p>
                <p><span className="font-medium">Transparency:</span> Full Regulatory Compliance</p>
                <p><span className="font-medium">Audit Queries:</span> Use provided contact details</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

