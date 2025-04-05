import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo/logo-white.png';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: '#222',
      color: 'white',
      padding: '40px 0',
      marginTop: '40px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px'
      }}>
        {/* Column 1: Logo and tagline */}
        <div>
          <Link to="/">
            <img 
              src={logoImage}
              alt="OasisKL Logo" 
              style={{ 
                height: '50px',
                width: 'auto',
                marginBottom: '15px'
              }} 
            />
          </Link>
          <p style={{ marginTop: '15px', fontSize: '14px', lineHeight: '1.6' }}>
            Connecting KL residents with urban green spaces.
            Discover, explore, and reconnect with nature in the city.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            position: 'relative',
            paddingBottom: '10px'
          }}>
            Quick Links
            <span style={{ 
              position: 'absolute', 
              bottom: '0', 
              left: '0', 
              width: '50px', 
              height: '3px', 
              backgroundColor: '#8BC34A' 
            }}></span>
          </h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/map" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>Discover Green Space</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            position: 'relative',
            paddingBottom: '10px'
          }}>
            Contact Us
            <span style={{ 
              position: 'absolute', 
              bottom: '0', 
              left: '0', 
              width: '50px', 
              height: '3px', 
              backgroundColor: '#8BC34A' 
            }}></span>
          </h3>
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ marginRight: '10px', minWidth: '20px' }}>📍</span>
              <span>123 Green Street, Kuala Lumpur, Malaysia</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ marginRight: '10px', minWidth: '20px' }}>✉️</span>
              <span>info@oasiskl.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div style={{ 
        borderTop: '1px solid #444', 
        marginTop: '10px', 
        paddingTop: '30px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '14px', color: '#aaa' }}>
          © {new Date().getFullYear()} OasisKL. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;