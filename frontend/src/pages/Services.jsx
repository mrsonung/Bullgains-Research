import React from 'react';
import { TrendingUp, BarChart3, Target, Shield, Users, CheckCircle, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
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

  const services = [
    {
      id: 1,
      title: "Research",
      description: "All research views are backed by thorough analysis and data for consistent results. Our comprehensive research methodology ensures accurate and reliable market insights.",
      icon: <TrendingUp className="w-8 h-8 text-[#7ED957]" />,
      features: [
        "Thorough analysis and data backing",
        "Consistent and reliable results",
        "Comprehensive market coverage",
        "Regular updates and revisions"
      ]
    },
    {
      id: 2,
      title: "Customer Focus",
      description: "Commitment to meeting clients' financial objectives with personalized service. We understand your unique investment goals and tailor our services accordingly.",
      icon: <Users className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Personalized service approach",
        "Client-specific financial objectives",
        "Dedicated relationship management",
        "Customized investment strategies"
      ]
    },
    {
      id: 3,
      title: "Risk Management",
      description: "Robust risk management plans to optimize client benefits and protect investments. Our systematic approach helps minimize risks while maximizing returns.",
      icon: <Shield className="w-8 h-8 text-[#0D4C3A]" />,
      features: [
        "Comprehensive risk assessment",
        "Portfolio diversification strategies",
        "Regular risk monitoring",
        "Protective investment measures"
      ]
    },
    {
      id: 4,
      title: "Vibrancy",
      description: "Young and energetic team dedicated to delivering optimal results. Our dynamic approach ensures fresh perspectives and innovative solutions.",
      icon: <Award className="w-8 h-8 text-[#FFD700]" />,
      features: [
        "Young and energetic team",
        "Fresh market perspectives",
        "Innovative research methods",
        "Dynamic service delivery"
      ]
    }
  ];

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
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Premium market intelligence, personalized strategies, and disciplined risk management—designed to help you navigate markets with confidence and clarity.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0D4C3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-6">{service.description}</p>
                
                <div className="space-y-2.5">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-[#7ED957] mt-0.5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Excellence Section */}
        <motion.div 
          className="bg-gradient-to-r from-[#0D4C3A] to-[#1A6A50] rounded-3xl shadow-xl p-10 text-white"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Service Excellence</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">Research Excellence</h3>
              <p className="opacity-90 mb-4">
                All our research views are backed by thorough analysis and data for consistent results. 
                We employ rigorous methodologies and cutting-edge tools to ensure the accuracy and reliability of our insights.
              </p>
              <p className="opacity-90">
                Our research team continuously monitors market trends, economic indicators, and company fundamentals 
                to provide you with the most current and actionable information.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Client Commitment</h3>
              <p className="opacity-90 mb-4">
                We are committed to meeting clients' financial objectives through personalized service and 
                robust risk management plans to optimize client benefits.
              </p>
              <p className="opacity-90">
                Our young and energetic team is dedicated to delivering optimal results, bringing fresh perspectives 
                and innovative approaches to market analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          className="text-center mt-24"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Why Choose Bullgains Research?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-[#7ED957]" />,
                title: "Data-Driven Research",
                desc: "All our research is backed by comprehensive data analysis and thorough market research methodologies."
              },
              {
                icon: <Shield className="w-8 h-8 text-[#FFD700]" />,
                title: "SEBI Compliance",
                desc: "We adhere to all SEBI guidelines and regulations to ensure authentic and compliant services."
              },
              {
                icon: <Users className="w-8 h-8 text-[#0D4C3A]" />,
                title: "Expert Team",
                desc: "Our management team has diverse corporate and industrial experience ensuring quality service delivery."
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

export default Services;