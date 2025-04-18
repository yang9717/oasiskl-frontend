import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '/assets/logo/logo-white.png';

const Header = () => {
  return (
    <header style={{ 
      backgroundColor: '#222',
      color: 'white',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo */}
      <div className="logo">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src={logoImage}
            alt="OasisKL Logo" 
            style={{ 
              height: '40px',
              width: 'auto'
            }} 
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0, 
          gap: '25px' 
        }}>
          <li><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/map" style={{ color: 'white', textDecoration: 'none' }}>Discover Green Space</Link></li>
          <li><Link to="/care-guides" style={{ color: 'white', textDecoration: 'none' }}>Grow Your Green Corner</Link></li>
          <li><Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>Plant Gallery</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;