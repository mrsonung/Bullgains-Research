import React from 'react';
import { TrendingUp, BarChart3, Target, Shield, Users, CheckCircle, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Services = () => {
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

  const services = [
    {
      id: 1,
      title: "Research",
      description: "All research views are backed by thorough analysis and data for consistent results. Our comprehensive research methodology ensures accurate and reliable market insights.",
      icon: <TrendingUp className="w-8 h-8" />,
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
      icon: <Users className="w-8 h-8" />,
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
      icon: <Shield className="w-8 h-8" />,
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
      icon: <Award className="w-8 h-8" />,
      features: [
        "Young and energetic team",
        "Fresh market perspectives",
        "Innovative research methods",
        "Dynamic service delivery"
      ]
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
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We provide comprehensive market research and analysis services designed to help you make informed business decisions. 
            Our commitment to excellence and client satisfaction drives everything we do.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Details */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Service Excellence</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research Excellence</h3>
              <p className="text-gray-600 mb-4">
                All our research views are backed by thorough analysis and data for consistent results. 
                We employ rigorous methodologies and cutting-edge tools to ensure the accuracy and reliability of our insights.
              </p>
              <p className="text-gray-600">
                Our research team continuously monitors market trends, economic indicators, and company fundamentals 
                to provide you with the most current and actionable information.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Commitment</h3>
              <p className="text-gray-600 mb-4">
                We are committed to meeting clients' financial objectives through personalized service and 
                robust risk management plans to optimize client benefits.
              </p>
              <p className="text-gray-600">
                Our young and energetic team is dedicated to delivering optimal results, bringing fresh perspectives 
                and innovative approaches to market analysis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Bullgains Research?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Research</h3>
              <p className="text-gray-600">
                All our research is backed by comprehensive data analysis and thorough market research methodologies.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">SEBI Compliance</h3>
              <p className="text-gray-600">
                We adhere to all SEBI guidelines and regulations to ensure authentic and compliant services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
              <p className="text-gray-600">
                Our management team has diverse corporate and industrial experience ensuring quality service delivery.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          variants={fadeInUp}
        >
          <div className="bg-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 opacity-90">
              Contact us today to learn more about our research services and how we can help you make informed investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contact Us Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;

