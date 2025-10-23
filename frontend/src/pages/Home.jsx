import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Users, Award, CheckCircle, Shield, Target, Clock } from 'lucide-react';
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
        {/* Background Video */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 
  className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg"
  variants={fadeInUp}
>
  Smart Research for{' '}
  <span className="text-yellow-400 drop-shadow-md">Smarter Investment</span>
</motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              In-depth, SEBI-compliant market research and analysis to help you make confident, data-driven decisions.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Explore Our Research
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-lg"
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
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-5">
              Why Choose <span className="text-blue-700">Bullgains Research</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional, transparent, and SEBI-registered research backed by decades of market experience.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
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
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                variants={fadeInUp}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{item.value}</h3>
                <p className="text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {[
              { icon: TrendingUp, title: 'Research', desc: 'All views backed by thorough analysis and real-time data.' },
              { icon: BarChart3, title: 'Customer Focus', desc: 'Personalized strategies aligned with your financial goals.' },
              { icon: Shield, title: 'Risk Management', desc: 'Protect your capital with disciplined risk frameworks.' },
              { icon: Award, title: 'Vibrant Team', desc: 'Young, energetic experts delivering sharp insights.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white p-7 rounded-2xl shadow-md border border-gray-100 text-center hover:shadow-lg transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-5xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Ready to Make Informed Investment Decisions?
          </motion.h2>
          <motion.p 
            className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Join thousands of investors who trust Bullgains Research for authentic, actionable market intelligence.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link
              to="/payment-details"
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[220px]"
            >
              Get Started Today
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 min-w-[220px]"
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