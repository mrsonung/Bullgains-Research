import React from 'react';
import { RotateCcw, CreditCard, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const RefundCancellationPolicy = () => {
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
              <RotateCcw className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund & Cancellation Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our policy regarding refunds and service cancellations.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* General Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-6 h-6 text-blue-500 mr-2" />
              General Policy
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research offers refunds and cancellations under specific circumstances. 
                This policy outlines the terms and conditions for refunds and cancellations of our services.
              </p>
              <p>
                All refund requests are subject to review and approval by our management team. 
                Refunds will be processed within 7-10 business days after approval.
              </p>
            </div>
          </section>

          {/* Refund Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Eligibility</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Refunds may be considered in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service not delivered as per agreed terms</li>
                <li>Technical issues preventing service access</li>
                <li>Duplicate payment made by mistake</li>
                <li>Service cancellation within 24 hours of subscription</li>
                <li>Force majeure events affecting service delivery</li>
              </ul>
            </div>
          </section>

          {/* Non-Refundable Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              Non-Refundable Services
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Important Notice</h3>
                  <p className="text-red-700">
                    The following services are generally non-refundable:
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Services already delivered or consumed</li>
                <li>Custom research reports tailored to client requirements</li>
                <li>Services cancelled after 24 hours of subscription</li>
                <li>Services affected by client's failure to provide required information</li>
                <li>Services cancelled due to client's change of mind</li>
              </ul>
            </div>
          </section>

          {/* Cancellation Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-6 h-6 text-green-500 mr-2" />
              Cancellation Process
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                To cancel a service or request a refund, please follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact our customer support team via email or phone</li>
                <li>Provide your account details and reason for cancellation</li>
                <li>Submit any required documentation or proof</li>
                <li>Wait for our team to review your request</li>
                <li>Receive confirmation of approval or denial</li>
                <li>If approved, receive refund within 7-10 business days</li>
              </ol>
            </div>
          </section>

          {/* Refund Processing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Approved refunds will be processed as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Refunds will be credited to the original payment method</li>
                <li>Processing time: 7-10 business days</li>
                <li>Refund amount will exclude any applicable taxes or fees</li>
                <li>Bank charges, if any, will be borne by the client</li>
                <li>Partial refunds may be considered based on service usage</li>
              </ul>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                In case of disputes regarding refunds or cancellations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact our customer support team first</li>
                <li>Escalate to our management team if required</li>
                <li>Provide detailed documentation and evidence</li>
                <li>We will review and respond within 5 business days</li>
                <li>Final decisions will be communicated in writing</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                For refund and cancellation requests, please contact us at:
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

export default RefundCancellationPolicy;
