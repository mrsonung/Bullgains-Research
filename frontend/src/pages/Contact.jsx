import React from 'react';
import { MapPin, Mail, Globe, Building, FileText, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Reach out to our team for inquiries about research services, investment guidance, or any questions about Bullgains Research.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {/* Office Info */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Registered & Principal Office</h2>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    No. 631, Brahmpur,<br />
                    Po-New Jaganpura, Ps-Ramkrishna Nagar,<br />
                    Patna, Bihar – 800027
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">support@bullgains.in</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-900">Website</p>
                  <p className="text-gray-600">www.bullgains.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Note / Compliance */}
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Compliance & Support</h2>
            </div>
            <div className="space-y-5 text-gray-700">
              <p className="leading-relaxed">
                We are SEBI-registered Research Analysts committed to transparency, integrity, and client-first service.
              </p>
              <p className="leading-relaxed">
                For service-related queries, disclosures, or complaints, please email us at 
                <span className="font-semibold text-blue-700"> support@bullgains.in</span>.
              </p>
              <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-500 italic">
                  ⚠️ Investment in securities market is subject to market risks. Read all related documents carefully before investing.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Company Information (Re-enabled with elegant design) */}
        {/* <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Regulatory & Legal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building, label: 'BSE Membership', value: '5422' },
              { icon: Shield, label: 'SEBI RA Reg. No.', value: 'INH000008093' },
              { icon: FileText, label: 'CIN', value: 'U72900MH2020PTC346236' },
              { icon: Globe, label: 'GSTIN', value: '10ABEFB4164D1Z5' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 rounded-xl p-5 text-center hover:bg-blue-50 transition-colors duration-200"
                whileHover={{ y: -4 }}
              >
                <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="text-xs text-gray-500 font-medium mb-2">{item.label}</p>
                <p className="font-semibold text-gray-900 text-sm">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Contact;