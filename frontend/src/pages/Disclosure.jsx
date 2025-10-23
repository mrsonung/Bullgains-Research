import React from 'react';
import { Eye, AlertCircle, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Disclosure = () => {
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
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclosure</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important disclosures regarding our research methodology, conflicts of interest, and business relationships.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Research Methodology */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="w-6 h-6 text-blue-500 mr-2" />
              Research Methodology
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our research methodology is based on fundamental analysis, technical analysis, and market 
                sentiment analysis. We use publicly available information, company financial statements, 
                industry reports, and market data to form our investment recommendations.
              </p>
              <p>
                Our research process includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analysis of company financials and business fundamentals</li>
                <li>Technical analysis of price charts and market trends</li>
                <li>Assessment of industry dynamics and competitive positioning</li>
                <li>Evaluation of macroeconomic factors and market conditions</li>
                <li>Risk assessment and valuation analysis</li>
              </ul>
            </div>
          </section>

          {/* Conflicts of Interest */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 text-yellow-500 mr-2" />
              Conflicts of Interest
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700">
                    Bullgains Research maintains strict policies to manage and disclose potential conflicts 
                    of interest. We are committed to providing unbiased research and recommendations.
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                We may have business relationships with companies that are the subject of our research. 
                These relationships may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Investment banking relationships</li>
                <li>Corporate finance advisory services</li>
                <li>Market making activities</li>
                <li>Proprietary trading positions</li>
                <li>Research coverage agreements</li>
              </ul>
              <p>
                All such relationships are disclosed in our research reports where applicable. 
                We maintain strict Chinese walls between our research and investment banking activities.
              </p>
            </div>
          </section>

          {/* Business Relationships */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-6 h-6 text-green-500 mr-2" />
              Business Relationships
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research may have business relationships with various market participants, 
                including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Brokerage firms and investment banks</li>
                <li>Asset management companies</li>
                <li>Corporate clients and issuers</li>
                <li>Institutional investors</li>
                <li>Market data providers</li>
              </ul>
              <p>
                These relationships are managed in accordance with SEBI regulations and our internal 
                policies to ensure the independence and objectivity of our research.
              </p>
            </div>
          </section>

          {/* Research Independence */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Independence</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Our research analysts are compensated based on the quality and accuracy of their research, 
                not on investment banking revenues or trading profits. We maintain strict independence 
                in our research process and recommendations.
              </p>
              <p>
                Our research reports are not influenced by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Investment banking relationships</li>
                <li>Trading positions or proprietary investments</li>
                <li>Corporate client relationships</li>
                <li>Market making activities</li>
                <li>Any other business interests</li>
              </ul>
            </div>
          </section>

          {/* Material Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                All material information used in our research is obtained from publicly available sources 
                or through legitimate channels. We do not use or rely on any material non-public information 
                in our research process.
              </p>
              <p>
                Our research reports include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Sources of information and data</li>
                <li>Methodology and assumptions used</li>
                <li>Risk factors and limitations</li>
                <li>Disclosure of any material relationships</li>
                <li>Analyst certifications and qualifications</li>
              </ul>
            </div>
          </section>

          {/* Regulatory Disclosures */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Disclosures</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bullgains Research is registered with SEBI as a Research Analyst (Registration Number: INH000022190). 
                Our research activities are conducted in accordance with SEBI Research Analyst Regulations, 2014.
              </p>
              <p>
                Key regulatory disclosures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SEBI Registration Number: INH000022190</li>
                <li>BSE Membership Number: 6660</li>
                {/* <li>Corporate Identification Number: U72900MH2020PTC346236</li> */}
                <li>GSTIN: 10ABEFB4164D1Z5</li>
                {/* <li>Partnership Deed Date: 05 Feb 2025</li> */}
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                For any questions regarding our disclosures or research methodology, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@bullgains.in<br />
                <strong>Address:</strong> No. 631, Brahmpur, Po-New Jaganpura, Ps-Ramkrishna Nagar, Patna, Bihar  800027
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

export default Disclosure;
