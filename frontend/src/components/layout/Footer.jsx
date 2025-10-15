import React from 'react';
import { MapPin, Phone, Mail, Shield, ExternalLink, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Logo and Description */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-white text-2xl font-bold">BULLGAINS RESEARCH</h3>
            </div>
            <div className="flex-shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Bullgains Research Logo" 
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
          </div>
          <p className="text-sm text-gray-400 max-w-4xl">
            In-depth market research and analysis to help you make more informed business decisions. 
            We are dedicated to constantly bettering ourselves in terms of our research capabilities 
            and strive to provide the best possible experience to all of our clients.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Information */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-lg font-semibold mb-4">Company Information</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Registered Office</p>
                  <p>No. 631, Brahmpur, Po-New Jaganpura, Ps-Ramkrishna Nagar, Patna, Bihar – 800027</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Contact</p>
                  <p>+91 9288108955</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-medium text-white">Follow us</p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">

                <a href="https://instagram.com/bullgainsresearch" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" /> Instagram
                  </a> 

                  <a href="https://threads.com/bullgainsresearch" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" /> Threads
                  </a>
                  <a href="https://twitter.com/BullgainsR" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" /> Twitter
                  </a>
                  <a href="https://www.linkedin.com/in/bullgains-research-44588438a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" /> LinkedIn
                  </a>
                  
                  {/* <a href="https://youtube.com/bullgains" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center">
                    <ExternalLink className="w-4 h-4 mr-1" /> YouTube
                  </a> */}
                </div>
              </div>
            <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p>support@bullgains.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Registration Details</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">BSE Membership Number:</span> 6660</p>
              <p><span className="font-medium">SEBI Research Analysts Registration Number:</span> INH000022190</p>
              {/* <p><span className="font-medium">Corporate Identification Number:</span> U72900MH2020PTC346236</p> */}
              <p><span className="font-medium">GSTIN:</span> 10ABEFB4164D1Z5</p>
              {/* <p><span className="font-medium">Partnership Deed Date:</span> 05 Feb 2025</p> */}
              <p><span className="font-medium">Official Website:</span> www.bullgains.in</p>
            </div>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Compliance</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p>SEBI Research Analyst Regulations compliant</p>
              </div>
              <p>Arms-length segregation from distribution services</p>
              <p>Conflict-of-interest management and routine disclosures</p>
            </div>
          </div>
        </div>

        {/* Important Links */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <h4 className="text-white text-lg font-semibold mb-4">Important Links</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Disclaimer
            </Link>
            <Link to="/disclosure" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Disclosure
            </Link>
            <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Privacy Policy
            </Link>
            <Link to="/service-delivery-policy" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Service Delivery Policy
            </Link>
            <Link to="/refund-cancellation-policy" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Refund & Cancellation Policy
            </Link>
            <Link to="/risk-short-term-investments" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Risk with Short Term Investments
            </Link>
            <Link to="/investor-charter" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              Investor Charter
            </Link>
            <Link to="/odr" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              ODR
            </Link>
            <Link to="/odr-circular" className="text-gray-400 hover:text-white transition-colors flex items-center">
              <ExternalLink className="w-3 h-3 mr-1" />
              ODR Circular
            </Link>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-yellow-400 font-semibold mb-2">Risk Warning</h5>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Investment in securities market are subject to market risks. Read all the related documents carefully before investing. 
                  Trading derivatives and leveraged products carries a high level of risk, including the risk of losing substantially more than your initial investment. 
                  It is not suitable for everyone. Before you make any decision in relation to a financial product, you should read the risks associated with 
                  short-term investments available on our website and seek independent advice if necessary.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-xs text-gray-500 text-center">
          <p>© {new Date().getFullYear()} Bullgains Research. All rights reserved.</p>
          <p className="mt-1">Disputes subject to Indian Arbitration and Conciliation Act, 1996.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


