import React from 'react';
import { AlertTriangle, TrendingDown, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const RiskShortTermInvestments = () => {
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
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Risk with Short Term Investments</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Important information about the risks associated with short-term investments.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* High Risk Warning */}
          <section>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-8 h-8 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-red-800 mb-4">HIGH RISK WARNING</h2>
                  <p className="text-red-700 text-lg">
                    Short-term investments carry significant risks and may result in substantial losses. 
                    Past performance is not indicative of future results. You should carefully consider 
                    your investment objectives and risk tolerance before investing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Types of Short-Term Investments */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingDown className="w-6 h-6 text-orange-500 mr-2" />
              Types of Short-Term Investments
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Short-term investments typically include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Day trading in stocks and derivatives</li>
                <li>Short-term mutual funds and ETFs</li>
                <li>Currency trading (Forex)</li>
                <li>Commodity trading</li>
                <li>Cryptocurrency trading</li>
                <li>Options and futures trading</li>
              </ul>
            </div>
          </section>

          {/* Key Risks */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Risks Associated</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">Market Risk</h3>
                <ul className="text-yellow-700 space-y-2 text-sm">
                  <li>• Price volatility and market fluctuations</li>
                  <li>• Economic factors affecting asset prices</li>
                  <li>• Interest rate changes</li>
                  <li>• Currency exchange rate risks</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-3">Liquidity Risk</h3>
                <ul className="text-red-700 space-y-2 text-sm">
                  <li>• Difficulty in selling assets quickly</li>
                  <li>• Market depth and trading volume</li>
                  <li>• Bid-ask spreads</li>
                  <li>• Market closure risks</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Credit Risk</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Default by counterparties</li>
                  <li>• Credit rating downgrades</li>
                  <li>• Corporate bankruptcy risks</li>
                  <li>• Sovereign debt risks</li>
                </ul>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Operational Risk</h3>
                <ul className="text-purple-700 space-y-2 text-sm">
                  <li>• Technology failures and glitches</li>
                  <li>• Human errors in trading</li>
                  <li>• Settlement and clearing risks</li>
                  <li>• Regulatory compliance risks</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Leverage and Margin Risks */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="w-6 h-6 text-red-500 mr-2" />
              Leverage and Margin Risks
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Critical Warning</h3>
                  <p className="text-red-700">
                    Leveraged products can amplify both gains and losses. You may lose more than your 
                    initial investment when using leverage or margin trading.
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Margin calls may require additional funds</li>
                <li>Forced liquidation of positions</li>
                <li>Interest charges on borrowed funds</li>
                <li>Increased volatility in leveraged positions</li>
                <li>Potential for unlimited losses in certain products</li>
              </ul>
            </div>
          </section>

          {/* Risk Management */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risk Management Strategies</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                To manage risks in short-term investments, consider:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Diversification across different asset classes</li>
                <li>Setting stop-loss orders to limit losses</li>
                <li>Position sizing based on risk tolerance</li>
                <li>Regular monitoring and rebalancing</li>
                <li>Maintaining adequate cash reserves</li>
                <li>Understanding the products you invest in</li>
                <li>Seeking professional advice when needed</li>
              </ul>
            </div>
          </section>

          {/* Regulatory Considerations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Considerations</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Short-term investments are subject to various regulatory requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>SEBI regulations for securities trading</li>
                <li>RBI guidelines for currency trading</li>
                <li>Tax implications of short-term gains</li>
                <li>Reporting requirements for large transactions</li>
                <li>Compliance with anti-money laundering laws</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                For more information about investment risks, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@bullgains.in<br />
                <strong>Phone:</strong> support@bullgains.in<br />
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

export default RiskShortTermInvestments;
