import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '/assets/logo/logo-white.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Column 1: Logo and tagline */}
        <div>
          <Link to="/" className="inline-block">
            <img 
              src={logoImage}
              alt="OasisKL Logo" 
              className="h-12 w-auto mb-4" 
            />
          </Link>
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Connecting KL residents with urban green spaces.
            Discover, explore, and reconnect with nature in the city.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-5 pb-2 relative">
            Quick Links
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-500"></span>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link to="/" className="text-gray-300 hover:text-green-300 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/map" className="text-gray-300 hover:text-green-300 transition duration-200">
                Discover Green Space
              </Link>
            </li>
            <li>
              <Link to="/care-guides" className="text-gray-300 hover:text-green-300 transition duration-200">
                Grow Your Green Corner
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-gray-300 hover:text-green-300 transition duration-200">
                Plant Gallery
              </Link>
            </li>
            <li>
              <Link to="/plant-identifier" className="text-gray-300 hover:text-green-300 transition duration-200">
                Plant Identifier
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h3 className="text-lg font-bold mb-5 pb-2 relative">
            Contact Us
            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-500"></span>
          </h3>
          <ul className="space-y-3">
            <li className="flex">
              <span className="mr-3 text-green-400">📍</span>
              <span className="text-gray-300">123 Green Street, Kuala Lumpur, Malaysia</span>
            </li>
            <li className="flex">
              <span className="mr-3 text-green-400">✉️</span>
              <a href="mailto:info@oasiskl.com" className="text-gray-300 hover:text-green-300 transition duration-200">
                info@oasiskl.com
              </a>
            </li>
            <li className="flex mt-4">
              <span className="mr-3 text-green-400">📱</span>
              <a href="tel:+60123456789" className="text-gray-300 hover:text-green-300 transition duration-200">
                +60 12-345 6789
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} OasisKL. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;