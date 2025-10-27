import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, Users, Award, Clock, Shield, Target, MapPin, Mail, ExternalLink, AlertTriangle, FileText, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import MarketOverview from '../components/MarketOverview';

const TawkToWidget = () => {
  useEffect(() => {
    const s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/68ff46a0108634194eef337d/1j8iinpes";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    document.body.appendChild(s1);
    return () => {
      document.body.removeChild(s1);
    };
  }, []);
  return null;
};

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
      <TawkToWidget />
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
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  to="/services"
                  className="block w-full sm:w-auto text-center bg-gradient-to-r from-[#FFD700] to-[#FFCB05] text-[#0D4C3A] px-6 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Our Research
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  to="/customer-query"
                  className="block w-full sm:w-auto text-center bg-transparent border-2 border-white text-white px-6 py-3.5 rounded-xl font-bold text-base sm:text-lg hover:bg-white hover:text-[#0D4C3A] transition-all duration-300"
                >
                  Get In Touch
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Real-time Market Analytics */}
      {/* <MarketOverview /> */}

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
              to="/customer-query"
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

      {/* Footer Section */}
      <footer className="footer-bg">
        <div className="footer-container">
          {/* Company Logo and Description */}
          <div className="brand-section">
            <div className="brand-header">
              <h3 className="brand-title">BULLGAINS RESEARCH</h3>
              <img 
                src="/logo.jpg" 
                alt="Bullgains Research Logo" 
                className="brand-logo"
              />
            </div>
            <p className="brand-description">
              In-depth market research and analysis to help you make more informed business decisions. 
              We are dedicated to constantly bettering ourselves in terms of our research capabilities 
              and strive to provide the best possible experience to all of our clients.
            </p>
          </div>

          {/* Main Footer Content */}
          <div className="main-content-grid">
            {/* Company Information */}
            <div className="company-info">
              <h4 className="section-title">Company Information</h4>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <p className="contact-label">Registered Office</p>
                  <p className="contact-text">
                    No. 631, Brahmpur, Po-New Jaganpura, Ps-Ramkrishna Nagar, Patna, Bihar – 800027
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.543532431326!2d85.12854337508878!3d25.58533332928873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f23e8c1c9d9c3f%3A0x4f1a0a0a0a0a0a0a!2sBrahmpur%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="180"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bullgains Research Location"
                ></iframe>
              </div>

              <div className="contact-item">
                <Mail className="contact-icon" />
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-text">support@bullgains.in</p>
                </div>
              </div>

              <div className="social-section">
                <p className="contact-label">Follow us</p>
                <div className="social-links">
                  <a href="https://www.instagram.com/bullgainsresearch" target="_blank" rel="noopener noreferrer" className="social-link">
                    <ExternalLink className="external-icon" /> Instagram
                  </a>
                  <a href="https://www.linkedin.com/in/bullgains-44588438a/" target="_blank" rel="noopener noreferrer" className="social-link">
                    <ExternalLink className="external-icon" /> LinkedIn
                  </a>
                  <a href="https://threads.com/bullgainsresearch" target="_blank" rel="noopener noreferrer" className="social-link">
                    <ExternalLink className="external-icon" /> Threads
                  </a>
                  <a href="https://twitter.com/bullgainsr" target="_blank" rel="noopener noreferrer" className="social-link">
                    <ExternalLink className="external-icon" /> Twitter
                  </a>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div>
              <h4 className="section-title" style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#ffffffff', 
                marginBottom: '1rem',
                borderBottom: '2px solid #0D4C3A',
                paddingBottom: '0.5rem'
              }}>
                Registration Details
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Shield className="w-6 h-6 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
                  <div>
                    <p style={{ 
                      fontWeight: '600', 
                      color: '#ffffffff', 
                      fontSize: '0.95rem',
                      marginBottom: '0.25rem'
                    }}>
                      SEBI Research Analyst Reg. No.
                    </p>
                    <p style={{ 
                      fontWeight: '700', 
                      color: '#fff700', 
                      fontSize: '1.1rem',
                      fontFamily: 'monospace',
                      letterSpacing: '0.5px'
                    }}>
                      INH000022190
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <FileText className="w-6 h-6 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
                  <div>
                    <p style={{ 
                      fontWeight: '600', 
                      color: '#ffffffff', 
                      fontSize: '0.95rem',
                      marginBottom: '0.25rem'
                    }}>
                      GSTIN
                    </p>
                    <p style={{ 
                      fontWeight: '700', 
                      color: '#fff700', 
                      fontSize: '1.1rem',
                      fontFamily: 'monospace',
                      letterSpacing: '0.5px'
                    }}>
                      10ABEFB4164D1Z5
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Globe className="w-6 h-6 text-[#0D4C3A] mt-0.5 flex-shrink-0" />
                  <div>
                    <p style={{ 
                      fontWeight: '600', 
                      color: '#ffffffff', 
                      fontSize: '0.95rem',
                      marginBottom: '0.25rem'
                    }}>
                      Official Website
                    </p>
                    <a 
                      href="https://www.bullgains.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        fontWeight: '700', 
                        color: '#fff700', 
                        fontSize: '1.1rem',
                        textDecoration: 'none',
                        borderBottom: '1px dashed #0D4C3A',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => e.target.style.color = '#1A6A50'}
                      onMouseLeave={e => e.target.style.color = '#fff700'}
                    >
                      www.bullgains.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance */}
            <div className="compliance-section">
              <h4 className="section-title">Compliance</h4>
              <div className="compliance-list">
                <div className="compliance-item">
                  <Shield className="shield-icon" />
                  <span>SEBI Research Analyst Regulations compliant</span>
                </div>
                <p>Arms-length segregation from distribution services</p>
                <p>Conflict-of-interest management and routine disclosures</p>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="links-section">
            <h4 className="section-title">Important Links</h4>
            <div className="links-grid">
              <Link to="/disclaimer" className="link-item">
                <ExternalLink className="link-icon" /> Disclaimer
              </Link>
              <Link to="/disclosure" className="link-item">
                <ExternalLink className="link-icon" /> Disclosure
              </Link>
              <Link to="/terms-conditions" className="link-item">
                <ExternalLink className="link-icon" /> Terms & Conditions
              </Link>
              <Link to="/privacy-policy" className="link-item">
                <ExternalLink className="link-icon" /> Privacy Policy
              </Link>
              <Link to="/service-delivery-policy" className="link-item">
                <ExternalLink className="link-icon" /> Service Delivery Policy
              </Link>
              <Link to="/refund-cancellation-policy" className="link-item">
                <ExternalLink className="link-icon" /> Refund & Cancellation Policy
              </Link>
              <Link to="/risk-short-term-investments" className="link-item">
                <ExternalLink className="link-icon" /> Risk with Short Term Investments
              </Link>
              <Link to="/investor-charter" className="link-item">
                <ExternalLink className="link-icon" /> Investor Charter
              </Link>
              <Link to="/odr" className="link-item">
                <ExternalLink className="link-icon" /> ODR
              </Link>
              <Link to="/odr-circular" className="link-item">
                <ExternalLink className="link-icon" /> ODR Circular
              </Link>
            </div>
          </div>

          {/* Risk Warning */}
          <div className="risk-section">
            <div className="risk-box">
              <AlertTriangle className="warning-icon" />
              <div>
                <h5 className="warning-title">Risk Warning</h5>
                <p className="warning-text">
                  Investment in securities market are subject to market risks. Read all the related documents carefully before investing. 
                  Trading derivatives and leveraged products carries a high level of risk, including the risk of losing substantially more than your initial investment. 
                  It is not suitable for everyone. Before you make any decision in relation to a financial product, you should read the risks associated with 
                  short-term investments available on our website and seek independent advice if necessary.
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p>© {new Date().getFullYear()} Bullgains Research. All rights reserved.</p>
            <p>Disputes subject to Indian Arbitration and Conciliation Act, 1996.</p>
            {/* add the adminpanel link here and adjust it left corner of the homepage near by scrollbar  */}
            <Link to="/admin" className="admin-panel-link" style={{ textDecoration: "none", textAlign: "right" }}>
              👨
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
