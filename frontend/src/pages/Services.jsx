import React from "react";
import { TrendingUp, Target, Shield, Users, CheckCircle, Award } from "lucide-react";
import { motion } from "framer-motion";
// import "../styles/globalPages.css"; // global styling

const Services = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const services = [
    {
      id: 1,
      title: "Research",
      description:
        "All research views are backed by thorough analysis and data for consistent results. Our comprehensive research ensures data-backed decisions for optimized returns.",
      icon: <TrendingUp className="w-8 h-8 text-[#7ED957]" />,
      points: [
        "Detailed fundamental & technical analysis",
        "Data-backed insights with consistency",
        "Comprehensive sector-wide coverage",
        "Regular updates and revisions",
      ],
    },
    {
      id: 2,
      title: "Customer Focus",
      description:
        "Commitment to our clients’ financial goals with personalized support. We understand unique requirements and tailor strategies accordingly.",
      icon: <Users className="w-8 h-8 text-[#FFD700]" />,
      points: [
        "Client-specific portfolio guidance",
        "Dedicated relationship management",
        "Transparent service communication",
        "Personalized investment roadmaps",
      ],
    },
    {
      id: 3,
      title: "Risk Management",
      description:
        "We apply strong risk management frameworks to optimize profits while minimizing exposure. Our strategies balance aggressiveness with safety.",
      icon: <Shield className="w-8 h-8 text-[#0D4C3A]" />,
      points: [
        "Comprehensive risk assessment tools",
        "Portfolio diversification plans",
        "Proactive market risk alerts",
        "Tailored hedging and mitigation strategies",
      ],
    },
    {
      id: 4,
      title: "Vibrant Team",
      description:
        "Our dynamic, young, and professional team fuels innovation and precision. We bring passion and modern market understanding to every project.",
      icon: <Award className="w-8 h-8 text-[#FFD700]" />,
      points: [
        "Energetic, data-driven analysts",
        "Fresh perspectives with precision",
        "Innovative technical solutions",
        "Collaborative, client-first culture",
      ],
    },
  ];

  return (
    <div className="page-section">
      {/* Banner Section */}
      <div className="page-banner">
        <img src="/3.png" alt="Services Banner" />
        <div className="page-banner-overlay">
          <h1>Our Services</h1>
          <p>
            Premium market intelligence, personalized strategies, and disciplined risk management—helping investors navigate markets with confidence and clarity.
          </p>
        </div>
      </div>

      {/* Services Overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {services.map((item) => (
          <motion.div key={item.id} className="page-card p-8" variants={fadeInUp}>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0D4C3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-5">{item.description}</p>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {item.points.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-[#7ED957] mr-2 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Why Choose Section */}
      <div className="bg-gradient-to-r from-[#0D4C3A] to-[#1A6A50] text-white rounded-3xl shadow-lg p-10 md:p-12">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Bullgains Research?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-[#7ED957]" />,
              title: "Data-Driven Research",
              desc: "Every insight is built on detailed analysis, ensuring trust and accuracy in decision-making.",
            },
            {
              icon: <Shield className="w-8 h-8 text-[#FFD700]" />,
              title: "Regulatory Compliance",
              desc: "Strict adherence to SEBI regulations and transparent ethical practices.",
            },
            {
              icon: <Users className="w-8 h-8 text-[#EDEDED]" />,
              title: "Trusted Experts",
              desc: "Led by seasoned professionals with cross-industry financial expertise.",
            },
          ].map((reason, i) => (
            <div
              key={i}
              className="bg-white text-gray-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#0D4C3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{reason.title}</h3>
              <p className="text-sm text-gray-700 text-center">{reason.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
