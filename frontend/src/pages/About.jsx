import React from 'react';
import { Award, Users, Target, Shield, MapPin, Phone, Mail, Globe, FileText, CheckCircle, Building, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            About Bullgains Research
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We specialize in market research and analysis, emphasizing strict adherence to SEBI guidelines to ensure authentic, compliant, and high-impact services.  
            Our leadership brings decades of corporate and industrial expertise to deliver institutional-grade insights.
          </p>
        </motion.div>

        {/* Company Overview */}
        <motion.div 
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 mb-24"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Company Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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

        {/* Contact Information */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24"
          variants={staggerChildren}
        >
          <motion.div 
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Registered Office</h2>
            <div className="flex items-start space-x-4 mb-5">
              <MapPin className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Address</p>
                <p className="text-gray-600">
                  No. 631, Brahmpur, Po-New Jaganpura,<br />
                  Ps-Ramkrishna Nagar, Patna, Bihar - 800027
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-600">support@bullgains.in</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Principal Place of Business</h2>
            <div className="flex items-start space-x-4 mb-5">
              <MapPin className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Business Address</p>
                <p className="text-gray-600">
                  No. 631, Brahmpur, Po-New Jaganpura,<br />
                  Ps-Ramkrishna Nagar, Patna, Bihar - 800027
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 mb-5">
              <Mail className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Business Email</p>
                <p className="text-gray-600">support@bullgains.in</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Our Approach — Premium Icons & Colors */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Our Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-[#7ED957]" />,
                title: "Research Excellence",
                desc: "All research views are backed by thorough analysis and data for consistent results."
              },
              {
                icon: <Users className="w-8 h-8 text-[#FFD700]" />,
                title: "Customer Focus",
                desc: "Commitment to meeting clients' financial objectives with personalized service."
              },
              {
                icon: <Shield className="w-8 h-8 text-[#0D4C3A]" />,
                title: "Risk Management",
                desc: "Robust risk management plans to optimize client benefits and protect investments."
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-[#0D4C3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;