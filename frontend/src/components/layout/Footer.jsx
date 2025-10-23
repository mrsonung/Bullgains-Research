import React from 'react';
import { MapPin, Mail, Shield, ExternalLink, AlertTriangle, FileText, Globe } from 'lucide-react'; // Added FileText & Globe
import { Link } from 'react-router-dom';
// import './Footer.css'; // Import external CSS

const Footer = () => {
  return (
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

          {/* Registration Details — ENHANCED FOR VISIBILITY */}
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
          color: '#0D4C3A', 
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
          color: '#0D4C3A', 
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
            color: '#0D4C3A', 
            fontSize: '1.1rem',
            textDecoration: 'none',
            borderBottom: '1px dashed #0D4C3A',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.color = '#1A6A50'}
          onMouseLeave={(e) => e.target.style.color = '#0D4C3A'}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;