// import React from 'react';

// const PaymentDetails = () => {
//   const pricing = [
//     { title: 'Commodities Pack', price: '₹ 11,000', period: 'per month' },
//     { title: 'Stock Cash', price: '₹ 11,000', period: 'per month' },
//     { title: 'Basic F&O', price: '₹ 11,000', period: 'per month' },
//     { title: 'F&O Exclusive', price: '₹ 39,000', period: 'per month' },
//     { title: 'Equity Exclusive', price: '₹ 39,000', period: 'per month' },
//     { title: 'Commodity Exclusive', price: '₹ 39,000', period: 'per month' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
//         {/* Page Title */}
//         <div className="text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Pricing & Payments</h1>
//           <p className="text-gray-600 mt-2">Choose a plan and pay securely using the bank details below</p>
//         </div>

//         {/* Pricing first */}
//         <section className="space-y-6">
//           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Pricing</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {pricing.map((plan) => (
//               <div key={plan.title} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden transform transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
//                 <div className="bg-gray-100 text-gray-900 font-semibold text-xl px-6 py-4">
//                   {plan.title}
//                 </div>
//                 <div className="px-6 py-8">
//                   <div className="text-3xl font-bold text-blue-800">
//                     {plan.price} <span className="text-base font-semibold text-gray-700">{plan.period}</span>
//                   </div>
//                   <p className="text-gray-600 mt-6">Exclusive of applicable taxes</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Bank Details themed to site */}
//         <section aria-labelledby="bank-details">
//           <h2 id="bank-details" className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Bank Details</h2>
//           <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md border border-gray-200 transform transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//               {/* Logo area (left) */}
//               <div className="md:col-span-4 flex justify-center md:justify-start">
//                 <img
//                   src="/HDFC-LOGO.jpg"
//                   alt="HDFC Bank Logo - Bullgains"
//                   className="h-36 w-36 rounded-lg object-cover shadow-lg"
//                   style={{ maxWidth: '100%' }}
//                 />
//               </div>

//               {/* Details area (right) */}
//               <div className="md:col-span-8">
//                 <div className="space-y-3 text-gray-900">
//                   <div>
//                     <span className="font-semibold">Name:</span>{' '}
//                     <span>MS. Bullgains Research</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">Bank:</span>{' '}
//                     <span>HDFC Bank Limited</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">Account Number:</span>{' '}
//                     <span>50200108821107</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">IFSC Code:</span>{' '}
//                     <span>HDFC0004233</span>
//                   </div>
//                   <div>
//                     <span className="font-semibold">Account Type:</span>{' '}
//                     <span>Regular Account</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default PaymentDetails;


import React from 'react';

const PaymentDetails = () => {
  const pricing = [
    { title: 'Commodities Pack', price: '₹ 11,000', period: 'per month' },
    { title: 'Stock Cash', price: '₹ 11,000', period: 'per month' },
    { title: 'Basic F&O', price: '₹ 11,000', period: 'per month' },
    { title: 'F&O Exclusive', price: '₹ 39,000', period: 'per month' },
    { title: 'Equity Exclusive', price: '₹ 39,000', period: 'per month' },
    { title: 'Commodity Exclusive', price: '₹ 39,000', period: 'per month' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Pricing & Payments
          </h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Choose a plan and pay securely using the bank details below
          </p>
        </div>

        {/* Pricing Section */}
        <section className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Our Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricing.map((plan) => (
              <div
                key={plan.title}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.title}</h3>
                </div>
                <div className="px-6 py-8 text-center">
                  <div className="text-3xl font-extrabold text-blue-700">
                    {plan.price}
                    <span className="text-base font-semibold text-gray-600 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-5 text-sm">Exclusive of applicable taxes</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bank Details Section */}
        <section aria-labelledby="bank-details" className="relative">
          <h2 id="bank-details" className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Bank Transfer Details
          </h2>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* HDFC Logo – Full, uncropped, centered */}
              <div className="flex justify-center md:justify-start w-full md:w-auto">
                <img
                  src="/HDFC-LOGO.jpg"
                  alt="HDFC Bank Logo - Bullgains Research"
                  className="h-28 md:h-32 object-contain" // 👈 key: object-contain + fixed height
                />
              </div>

              {/* Bank Info */}
              <div className="w-full md:w-2/3 space-y-3 text-gray-800">
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-semibold text-gray-900 min-w-[120px]">Name:</span>
                  <span>MS. Bullgains Research</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-semibold text-gray-900 min-w-[120px]">Bank:</span>
                  <span>HDFC Bank Limited</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-semibold text-gray-900 min-w-[120px]">Account Number:</span>
                  <span className="font-mono">50200108821107</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-semibold text-gray-900 min-w-[120px]">IFSC Code:</span>
                  <span className="font-mono">HDFC0004233</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  <span className="font-semibold text-gray-900 min-w-[120px]">Account Type:</span>
                  <span>Regular Account</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentDetails;