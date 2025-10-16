import React from 'react';

const PaymentDetails = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-100 rounded-2xl p-8 md:p-12 shadow-md border border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Logo area (left) */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <img
                src="/logo.jpg"
                alt="Bank Logo"
                className="h-24 w-24 rounded-lg object-cover shadow"
              />
            </div>

            {/* Details area (right) */}
            <div className="md:col-span-8">
              <div className="space-y-4">
                <div className="text-gray-900">
                  <span className="font-semibold">Name:</span>{' '}
                  <span>MS. Bullgains Research</span>
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Bank:</span>{' '}
                  <span>HDFC Bank Limited</span>
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Account Number:</span>{' '}
                  <span>50200108821107</span>
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">IFSC Code:</span>{' '}
                  <span>HDFC0004233</span>
                </div>
                <div className="text-gray-900">
                  <span className="font-semibold">Account Type:</span>{' '}
                  <span>Regular Account</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;


