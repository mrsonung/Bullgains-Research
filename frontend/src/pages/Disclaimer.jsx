import React from 'react';
import { Shield, AlertTriangle, FileText, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
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
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important legal information regarding the use of our research services and investment recommendations.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* General Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              General Disclaimer
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                The information contained in this website and any research reports, analysis, or recommendations 
                provided by Bullgains Research ("the Company") is for informational purposes only and should not 
                be construed as investment advice, financial advice, trading advice, or any other sort of advice.
              </p>
              <p>
                All information provided is based on publicly available information and our own analysis. 
                While we strive to ensure the accuracy and completeness of the information, we make no 
                representations or warranties of any kind, express or implied, about the completeness, 
                accuracy, reliability, suitability, or availability of the information.
              </p>
            </div>
          </section>

          {/* Investment Risk Warning */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Scale className="w-6 h-6 text-red-500 mr-2" />
              Investment Risk Warning
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">High Risk Warning</h3>
                  <p className="text-red-700">
                    Trading in securities involves substantial risk of loss and is not suitable for all investors. 
                    Past performance is not indicative of future results. You should carefully consider whether 
                    trading is suitable for you in light of your circumstances, knowledge, and financial resources.
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <ul className="list-disc list-inside space-y-2">
                <li>All investments carry risk, including the risk of losing your entire investment</li>
                <li>Market conditions can change rapidly and unpredictably</li>
                <li>Leveraged products carry additional risks</li>
                <li>Currency fluctuations may affect the value of investments</li>
                <li>Regulatory changes may impact investment performance</li>
              </ul>
            </div>
          </section>

          {/* No Guarantee of Returns */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-2" />
              No Guarantee of Returns
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research does not guarantee any specific returns or profits from any investment 
                recommendations or strategies. All investment decisions should be made based on your own 
                research and risk assessment.
              </p>
              <p>
                The Company shall not be liable for any losses, damages, or expenses arising from the use 
                of our research or recommendations, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of profits, revenue, or business opportunities</li>
                <li>Investment losses or trading losses</li>
                <li>Any other financial losses</li>
              </ul>
            </div>
          </section>

          {/* Professional Advice */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Advice</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Before making any investment decisions, you should consult with qualified financial advisors 
                who can assess your individual circumstances and provide personalized advice.
              </p>
              <p>
                Our research is not a substitute for professional financial advice, and we recommend that 
                you seek independent advice before making any investment decisions.
              </p>
            </div>
          </section>

          {/* Regulatory Compliance */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research is a SEBI-registered Research Analyst (Registration Number: INH000008093). 
                However, this registration does not guarantee the accuracy or reliability of our research.
              </p>
              <p>
                Our research is provided in accordance with SEBI Research Analyst Regulations, 2014, 
                but users should conduct their own due diligence before making investment decisions.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                If you have any questions about this disclaimer or our services, please contact us at:
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

export default Disclaimer;
