import React from 'react';
import { FileText, Scale, AlertTriangle, Split } from 'lucide-react';

const Disclosures = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">Disclosures & Transparency</h1>

        <div className="space-y-6">
          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Standard Disclosures</h2>
            </div>
            <p className="text-gray-700 text-sm">We maintain routine disclosures as per SEBI Research Analyst Regulations, including past performance presentations, risk factors, methodology notes, and analyst certifications.</p>
          </section>

          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-3">
              <Split className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Arms-length Business Segregation</h2>
            </div>
            <p className="text-gray-700 text-sm">Research analyst activities are segregated from distribution and execution services. No commissions, brokerage, or referral fees are accepted in relation to execution.</p>
          </section>

          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-3">
              <Scale className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Conflict of Interest Management</h2>
            </div>
            <p className="text-gray-700 text-sm">We operate conflict identification, disclosure, and mitigation procedures including Chinese walls, restricted lists, trading blackouts, and analyst independence policies.</p>
          </section>

          <section className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Risk Disclosure</h2>
            </div>
            <p className="text-gray-700 text-sm">Securities markets are subject to market risk. Past performance is not indicative of future results. Investors should consider their risk tolerance and seek independent advice as necessary.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Disclosures;


