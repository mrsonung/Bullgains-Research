import React from 'react';
import { Award, Users, Target, Shield, MapPin, Phone, Mail, Globe, FileText, CheckCircle, Building, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Bullgains Research
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We specialize in market research and analysis, emphasizing adherence to SEBI guidelines to ensure authentic services. 
            Our top management has diverse corporate and industrial experience, ensuring quality service delivery.
          </p>
        </motion.div>

        {/* Company Overview */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Company Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Specialization</h3>
              <p className="text-gray-600 mb-4">
                We specialize in market research and analysis, emphasizing adherence to SEBI guidelines to ensure authentic services. 
                Our commitment to quality and compliance makes us a trusted partner for investors and traders.
              </p>
              <p className="text-gray-600">
                All our research views are backed by thorough analysis and data for consistent results, ensuring our clients 
                receive reliable and actionable market insights.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Management Excellence</h3>
              <p className="text-gray-600 mb-4">
                Our top management has diverse corporate and industrial experience, ensuring quality service delivery. 
                This diverse expertise allows us to provide comprehensive market analysis across various sectors.
              </p>
              <p className="text-gray-600">
                We are committed to meeting clients' financial objectives through personalized service and robust 
                risk management plans to optimize client benefits.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Official Company Details */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Official Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <FileText className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">GSTIN</p>
              <p className="font-semibold">10ABEFB4164D1Z5</p>
            </div>
            <div className="text-center">
              <Globe className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">Official Website</p>
              <p className="font-semibold">www.bullgains.in</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">Firm Type</p>
              <p className="font-semibold">Partnership Firm</p>
            </div>
            <div className="text-center">
              <Building className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-blue-200">Partnership Deed</p>
              <p className="font-semibold">05 Feb 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          variants={staggerChildren}
        >
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Office</h2>
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-gray-600">
                  No. 631, Brahmpur, Po-New Jaganpura,<br />
                  Ps-Ramkrishna Nagar, Patna, Bihar - 800027
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Contact Numbers</p>
                <p className="text-gray-600">+91 7903908955</p>
                
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">support@bullgains.in</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Principal Place of Business</h2>
            <div className="flex items-start space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-semibold text-gray-900">Business Address</p>
                <p className="text-gray-600">
                  No. 631, Brahmpur, Po-New Jaganpura,<br />
                  Ps-Ramkrishna Nagar, Patna, Bihar - 800027
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Business Contact</p>
                <p className="text-gray-600">+91 7903908955</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-900">Business Email</p>
                <p className="text-gray-600">support@bullgains.in</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Management Team */}
        {/* <motion.div 
          className="bg-gray-50 rounded-xl p-8 mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Management Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">CEO & Founder</h3>
              <p className="text-lg font-semibold text-blue-600 mb-2">Ashish Kumar Roushan</p>
              <p className="text-gray-600">
                Leading the strategic vision and operations with extensive experience in market research and analysis.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Founder</h3>
              <p className="text-lg font-semibold text-blue-600 mb-2">Navlesh Kumar Happy</p>
              <p className="text-gray-600">
                Co-founding partner with extensive market expertise and deep understanding of financial markets.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Team Excellence</h3>
              <p className="text-gray-600">
                Our top management has diverse corporate and industrial experience, ensuring quality service delivery. 
                This diverse expertise allows us to provide comprehensive market analysis across various sectors and industries.
              </p>
            </div>
          </div>
        </motion.div> */}

        {/* Our Approach */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Research Excellence</h3>
              <p className="text-gray-600">
                All research views are backed by thorough analysis and data for consistent results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Commitment to meeting clients' financial objectives with personalized service.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Management</h3>
              <p className="text-gray-600">
                Robust risk management plans to optimize client benefits and protect investments.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
