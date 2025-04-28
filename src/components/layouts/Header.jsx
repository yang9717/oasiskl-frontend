import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '/assets/logo/logo-white.png';

const Header = () => {
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGalleryDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    setGalleryDropdownOpen(prevState => !prevState);
  };

  // Handle click on Indoor Plants
  const handleIndoorClick = (e) => {
    // Don't prevent default here - let the Link navigate normally
    setGalleryDropdownOpen(false);
  };

  // Handle click on Outdoor Plants
  const handleOutdoorClick = (e) => {
    // Don't prevent default here - let the Link navigate normally
    setGalleryDropdownOpen(false);
  };

  // Handle "View All Plants" click
  const handleViewAllClick = (e) => {
    e.preventDefault();
    setGalleryDropdownOpen(false);
    // Use window.location for a full page reload
    window.location.href = '/gallery';
  };

  return (
    <header className="bg-gray-800 text-white px-10 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="logo">
        <Link to="/" className="flex items-center">
          <img 
            src={logoImage}
            alt="OasisKL Logo" 
            className="h-10 w-auto" 
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-green-300 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map" className="text-white hover:text-green-300 transition duration-200">
              Discover Green Space
            </Link>
          </li>
          <li>
            <Link to="/care-guides" className="text-white hover:text-green-300 transition duration-200">
              Grow Your Green Corner
            </Link>
          </li>
          <li ref={dropdownRef} className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center text-white hover:text-green-300 focus:outline-none transition duration-200"
              aria-expanded={galleryDropdownOpen}
              aria-haspopup="true"
              type="button"
            >
              <span>Plant Gallery</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${galleryDropdownOpen ? 'rotate-180' : ''}`}
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {galleryDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 py-2 w-33 bg-gray-700 rounded-md shadow-lg z-50 transform origin-top-left transition-transform duration-200"
              >
                <Link 
                  to="/gallery?suitability=Indoor%20friendly" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-600 hover:text-green-300 transition duration-150"
                  onClick={handleIndoorClick}
                >
                  Indoor Plants
                </Link>
                <Link 
                  to="/gallery?suitability=Outdoor%20only" 
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-600 hover:text-green-300 transition duration-150"
                  onClick={handleOutdoorClick}
                >
                  Outdoor Plants
                </Link>
                <div className="border-t border-gray-600 my-1"></div>
                <a 
                  href="/gallery"
                  onClick={handleViewAllClick}
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-600 hover:text-green-300 transition duration-150"
                >
                  View All Plants
                </a>
              </div>
            )}
          </li>
          <li>
            <Link to="/plant-identifier" className="text-white hover:text-green-300 transition duration-200">
              Plant Identifier
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;