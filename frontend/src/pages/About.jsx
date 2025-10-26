import React from "react";
import { Award, Users, Target, Shield, MapPin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="page-section">
      {/* Global Banner */}
      <div className="page-banner">
        <img src="/1.png" alt="About Bullgains Research" />
        <div className="page-banner-overlay">
          <h1>About Bullgains Research</h1>
          <p>
            We specialize in market research and analysis with strict SEBI
            compliance to ensure authenticity, transparency, and professional
            integrity in every insight we provide.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <motion.div
        className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10 mb-24"
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h2 className="section-heading">Company Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Specialization
            </h3>
            <p className="text-gray-600 mb-4">
              We focus on delivering deeply researched, data-driven, and SEBI-compliant financial insights. Our goal is to help investors and traders make educated, risk-optimized decisions.
            </p>
            <p className="text-gray-600">
              Each analysis we deliver is built on robust methodologies,
              ensuring accuracy, consistency, and true value addition for
              clients.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Management Excellence
            </h3>
            <p className="text-gray-600 mb-4">
              Our leadership blends decades of corporate, industrial, and financial market expertise, ensuring a broad perspective and disciplined execution standards.
            </p>
            <p className="text-gray-600">
              We strengthen this with a team of motivated professionals committed to meeting clients’ objectives through personalized strategies and structured financial planning.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact Details */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24"
        variants={staggerChildren}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Registered Office */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Registered Office
          </h2>
          <div className="flex items-start space-x-4 mb-5">
            <MapPin className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p className="text-gray-600">
                No. 631, Brahmpur, Po-New Jaganpura,
                <br />
                Ps-Ramkrishna Nagar, Patna, Bihar - 800027
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Mail className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-gray-600">support@bullgains.in</p>
            </div>
          </div>
        </motion.div>

        {/* Principal Office */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8"
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Principal Place of Business
          </h2>
          <div className="flex items-start space-x-4 mb-5">
            <MapPin className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Address</p>
              <p className="text-gray-600">
                No. 631, Brahmpur, Po-New Jaganpura,
                <br />
                Ps-Ramkrishna Nagar, Patna, Bihar - 800027
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Mail className="w-5 h-5 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-gray-600">support@bullgains.in</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Approach Section */}
      <motion.div
        className="text-center"
        initial="initial"
        whileInView="animate"
        variants={fadeInUp}
      >
        <h2 className="section-heading">Our Approach</h2>
        <div className="card-grid">
          {[
            {
              icon: <Target className="w-8 h-8 text-[#7ED957]" />,
              title: "Research Excellence",
              desc: "All research is grounded in deep data analytics and consistent validation for actionable outcomes.",
            },
            {
              icon: <Users className="w-8 h-8 text-[#FFD700]" />,
              title: "Customer Focus",
              desc: "We deliver personalized, value-driven financial guidance to align with clients' unique objectives.",
            },
            {
              icon: <Shield className="w-8 h-8 text-[#0D4C3A]" />,
              title: "Risk Management",
              desc: "Strong analytical systems and compliance-driven strategies designed for steady financial growth.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="page-card p-8 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-[#0D4C3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
