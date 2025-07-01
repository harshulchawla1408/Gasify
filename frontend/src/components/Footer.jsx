import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand + Newsletter */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Gasify Logo" className="h-16 w-auto object-contain" />
            <h3 className="text-2xl font-bold tracking-wide"></h3>
          </div>
          <p className="text-gray-300">Your trusted gas cylinder provider.</p>
          <form className="flex flex-col sm:flex-row items-center sm:space-x-2">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="w-full sm:flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-transform transform hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
              <FaInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white tracking-wide mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/terms" className="hover:text-white transition-colors duration-200">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors duration-200">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
  
          </ul>
        </div>

        {/* Why Gasify */}
        <div>
          <h4 className="text-lg font-semibold text-white tracking-wide mb-4">Why Gasify?</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Trusted by 10k+ Customers</li>
            <li>4.8 ★ on Google Reviews</li>
            <li>Fast Delivery within 24 hours</li>
            <li>24/7 Customer Support</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white tracking-wide mb-4">Contact Info</h4>
          <div className="space-y-2 text-gray-300">
            <p>📞 +91 78142 72742</p>
            <p>✉️ info@gasify.com</p>
            <p>📍 Jalandhar, Punjab</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {currentYear} Gasify. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Made with ❤️ for our customers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
