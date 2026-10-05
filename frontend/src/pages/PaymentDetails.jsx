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
            Choose a plan and make your payment securely using the official
            payment details below.
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
        <h2 className="section-heading">Official Payment Details</h2>

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

            {/* Bank Information */}
            <div className="w-full md:w-2/3 space-y-3 text-gray-800">
              <div className="bank-detail">
                <span className="bank-label">Account Holder:</span>
                <span className="font-semibold">Bullgains Research</span>
              </div>

              <div className="bank-detail">
                <span className="bank-label">Bank Name:</span>
                <span>HDFC Bank Limited</span>
              </div>

              <div className="bank-detail">
                <span className="bank-label">Account Number:</span>
                <span className="font-mono font-semibold">
                  50200108821107
                </span>
              </div>

              <div className="bank-detail">
                <span className="bank-label">IFSC Code:</span>
                <span className="font-mono font-semibold">
                  HDFC0004233
                </span>
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

          {/* UPI Payment */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-2">
                Official UPI ID
              </p>

              <p className="text-xl md:text-2xl font-bold text-gray-900 break-all">
                bullgainsresearch.ra@validhdfc
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Please verify the UPI ID carefully before making any payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Guidelines */}
      <section className="mt-12">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl border border-gray-100">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xl">⚠️</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Payment Guidelines
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Please read carefully before making a payment.
              </p>
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-4">
            {/* Guideline 1 */}
            <div className="flex gap-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <span className="text-blue-600 font-bold text-lg">✓</span>

              <p className="text-gray-700 leading-relaxed">
                Please make payments{" "}
                <strong className="text-gray-900">
                  only to the official Bullgains Research company bank account
                  or official UPI ID
                </strong>{" "}
                mentioned above.
              </p>
            </div>

            {/* Guideline 2 */}
            <div className="flex gap-4 p-4 rounded-xl bg-red-50 border border-red-100">
              <span className="text-red-600 font-bold text-lg">✕</span>

              <p className="text-gray-700 leading-relaxed">
                <strong className="text-red-700">
                  Do not make any payment
                </strong>{" "}
                to personal bank accounts, personal UPI IDs, or any
                unauthorized payment details.
              </p>
            </div>

            {/* Guideline 3 */}
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-700 font-bold text-lg">✓</span>

              <p className="text-gray-700 leading-relaxed">
                Before completing your payment,{" "}
                <strong className="text-gray-900">
                  verify the account number, IFSC code, account holder name,
                  and UPI ID
                </strong>{" "}
                carefully.
              </p>
            </div>

            {/* Guideline 4 */}
            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
              <span className="text-gray-700 font-bold text-lg">✓</span>

              <p className="text-gray-700 leading-relaxed">
                Bullgains Research will{" "}
                <strong className="text-gray-900">
                  not be responsible for payments made to unauthorized or
                  incorrect accounts/UPI IDs.
                </strong>
              </p>
            </div>

            {/* Guideline 5 */}
            <div className="flex gap-4 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
              <span className="text-yellow-600 font-bold text-lg">!</span>

              <p className="text-gray-700 leading-relaxed">
                If you have any doubt regarding the payment details,{" "}
                <strong className="text-gray-900">
                  please contact our official support team before making the
                  payment.
                </strong>
              </p>
            </div>
          </div>

          {/* Final Warning */}
          <div className="mt-8 bg-red-600 text-white rounded-xl p-5 text-center">
            <p className="font-bold text-lg">
              🚫 Do Not Make Payments to Personal Accounts or Personal UPI IDs
            </p>

            <p className="text-sm mt-1 text-red-100">
              Payments should be made only using the official payment details
              displayed on this page.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentDetails;
