import React from "react";

const PaymentDetails = () => {
  const pricing = [
    { title: "Commodities Pack", price: "₹ 11,000", period: "per month" },
    { title: "Stock Cash", price: "₹ 11,000", period: "per month" },
    { title: "Basic F&O", price: "₹ 11,000", period: "per month" },
    { title: "F&O Exclusive", price: "₹ 39,000", period: "per month" },
    { title: "Equity Exclusive", price: "₹ 39,000", period: "per month" },
    { title: "Commodity Exclusive", price: "₹ 39,000", period: "per month" },
  ];

  return (
    <div className="page-section">
      {/* Hero Banner */}
      <div className="page-banner">
        <img src="/2.png" alt="Payment Banner" />
        <div className="page-banner-overlay">
          <h1>Pricing & Payments</h1>
          <p>
            Choose a plan and pay securely using the bank details below.
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <section>
        <h2 className="section-heading">Our Plans</h2>
        <div className="card-grid">
          {pricing.map((plan) => (
            <div
              key={plan.title}
              className="page-card bg-white text-center p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {plan.title}
              </h3>
              <p className="text-3xl font-extrabold text-blue-700">
                {plan.price}
              </p>
              <p className="text-gray-500 font-medium">{plan.period}</p>
              <p className="text-sm text-gray-500 mt-4">
                Exclusive of applicable taxes
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bank Details Section */}
      <section className="mt-16">
        <h2 className="section-heading">Bank Transfer Details</h2>
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* HDFC Logo */}
            <div className="flex justify-center md:justify-start w-full md:w-1/3">
              <img
                src="/HDFC-LOGO.jpg"
                alt="HDFC Bank Logo"
                className="max-h-[120px] w-auto object-contain"
              />
            </div>

            {/* Bank Info */}
            <div className="w-full md:w-2/3 space-y-3 text-gray-800">
              <div className="bank-detail">
                <span className="bank-label">Account Holder:</span>
                <span>MS. Bullgains Research</span>
              </div>
              <div className="bank-detail">
                <span className="bank-label">Bank Name:</span>
                <span>HDFC Bank Limited</span>
              </div>
              <div className="bank-detail">
                <span className="bank-label">Account Number:</span>
                <span className="font-mono">50200108821107</span>
              </div>
              <div className="bank-detail">
                <span className="bank-label">IFSC Code:</span>
                <span className="font-mono">HDFC0004233</span>
              </div>
              <div className="bank-detail">
                <span className="bank-label">Branch:</span>
                <span>Patna, Bihar</span>
              </div>
              <div className="bank-detail">
                <span className="bank-label">Account Type:</span>
                <span>Current Account</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentDetails;
