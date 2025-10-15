import React from 'react';
import { Clock, CheckCircle, AlertTriangle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceDeliveryPolicy = () => {
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
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Delivery Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to delivering high-quality research and advisory services.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Service Standards */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
              Service Standards
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research is committed to providing high-quality research and advisory services 
                to our clients. We maintain the following service standards:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Timely delivery of research reports and analysis</li>
                <li>Accurate and comprehensive market information</li>
                <li>Professional and responsive customer service</li>
                <li>Compliance with SEBI regulations and industry standards</li>
                <li>Continuous improvement of our research methodology</li>
              </ul>
            </div>
          </section>

          {/* Research Delivery */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Delivery</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our research reports are delivered according to the following schedule:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Daily market updates: By 9:00 AM IST</li>
                <li>Weekly sector reports: Every Monday</li>
                <li>Monthly investment outlook: First working day of each month</li>
                <li>Special reports: As per client requirements</li>
                <li>Urgent market alerts: Within 2 hours of market events</li>
              </ul>
            </div>
          </section>

          {/* Quality Assurance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 text-blue-500 mr-2" />
              Quality Assurance
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                All our research reports undergo a rigorous quality assurance process:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Multi-level review by senior analysts</li>
                <li>Fact-checking and data verification</li>
                <li>Compliance review for regulatory requirements</li>
                <li>Peer review and feedback incorporation</li>
                <li>Final approval by research head</li>
              </ul>
            </div>
          </section>

          {/* Client Support */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Support</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We provide comprehensive client support services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Dedicated client relationship manager</li>
                <li>24/7 email support for urgent queries</li>
                <li>Phone support during business hours (9 AM - 6 PM IST)</li>
                <li>Regular client meetings and reviews</li>
                <li>Customized research based on client needs</li>
              </ul>
            </div>
          </section>

          {/* Service Level Commitments */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Level Commitments</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Our Commitments</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Response to client queries within 4 hours</li>
                    <li>• Research report delivery as per schedule</li>
                    <li>• 99.5% uptime for our digital platforms</li>
                    <li>• Regular client satisfaction surveys</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              Service Limitations
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                While we strive to provide the best possible service, there are certain limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Market conditions may affect report delivery timelines</li>
                <li>Regulatory changes may require service modifications</li>
                <li>Technical issues may cause temporary service disruptions</li>
                <li>Research accuracy depends on available market data</li>
                <li>Client-specific requests may require additional time</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                For any service-related queries or concerns, please contact us at:
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

export default ServiceDeliveryPolicy;
