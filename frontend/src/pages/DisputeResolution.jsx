import React from 'react';
import { Scale } from 'lucide-react';

const DisputeResolution = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Dispute Resolution</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <Scale className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Arbitration Clause</h2>
          </div>
          <p className="text-gray-700 text-sm">
            Any disputes arising out of or in connection with services rendered by BULLGAINS RESEARCH shall be resolved through arbitration in accordance with the provisions of the Indian Arbitration and Conciliation Act, 1996, as amended from time to time. The seat and venue of arbitration shall be India, and the proceedings shall be conducted in English.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisputeResolution;


