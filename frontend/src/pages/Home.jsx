import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Users, Award, Clock, Shield, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import MarketOverview from '../components/MarketOverview';

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/home.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              variants={fadeInUp}
            >
              Smart Research for{' '}
              <span className="text-[#FFD700]">Smarter Investment</span>
            </motion.h1>
            <motion.p 
              className="text-base md:text-lg lg:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed px-2"
              variants={fadeInUp}
            >
              SEBI-registered, data-driven market analysis to empower your investment decisions with confidence.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFCB05] text-[#0D4C3A] px-7 py-3.5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Our Research
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white px-7 py-3.5 rounded-xl font-bold text-lg hover:bg-white hover:text-[#0D4C3A] transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Market Analytics */}
      <MarketOverview />

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5">
              Why Choose <span className="text-[#0D4C3A]">Bullgains Research</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              SEBI-compliant, transparent, and backed by institutional-grade methodology.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { icon: Clock, value: '10+ Years', label: 'Combined corporate experience' },
              { icon: Users, value: '1000+', label: 'Clients served nationwide' },
              { icon: Target, value: 'Daily', label: 'Structured market updates' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 md:p-7 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-[#0D4C3A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 md:w-8 md:h-8 text-[#0D4C3A]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{item.value}</h3>
                <p className="text-gray-600 text-sm md:text-base">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { icon: TrendingUp, title: 'Research', desc: 'All views backed by thorough analysis and real-time data.', color: '#7ED957' },
              { icon: Users, title: 'Customer Focus', desc: 'Personalized strategies aligned with your financial goals.', color: '#FFD700' },
              { icon: Shield, title: 'Risk Management', desc: 'Protect your capital with disciplined risk frameworks.', color: '#0D4C3A' },
              { icon: Award, title: 'Vibrant Team', desc: 'Young, energetic experts delivering sharp insights.', color: '#FFD700' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#0D4C3A]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-r from-[#1321e3] to-[#001aff] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-[#FFD700] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#7ED957] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Ready to Make Informed Investment Decisions?
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl mb-8 text-[#E0F0E9] max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Join thousands of investors who trust Bullgains Research for authentic, actionable market intelligence.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              to="/payment-details"
              className="bg-gradient-to-r from-[#FFD700] to-[#FFCB05] text-[#0D4C3A] px-7 py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 min-w-[200px]"
            >
              Get Started Today
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-7 py-3.5 rounded-xl font-bold text-lg hover:bg-white hover:text-[#0D4C3A] transition-all duration-300 min-w-[200px]"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;