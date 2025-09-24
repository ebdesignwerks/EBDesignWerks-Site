import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { config } from '../utils/config';
import './Layout.css';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src="/images/ebdw_scan_cube_icon.svg" alt="EB Design Werks Logo" />
            <span>{config.business.name}</span>
          </Link>
          
          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/quote" className="quote-btn" onClick={() => setMobileMenuOpen(false)}>
              Request Quote
            </Link>
          </nav>
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      
      <main className="main">
        <Outlet />
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>{config.business.name}</h3>
              <p>{config.business.description}</p>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a></p>
              {config.contact.phone && <p>Phone: {config.contact.phone}</p>}
              {config.contact.address && <p>Location: {config.contact.address}</p>}
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/services">Services</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/about">About Us</Link>
              <Link to="/quote">Request Quote</Link>
            </div>
            
            {(config.social.instagram || config.social.facebook || config.social.linkedin) && (
              <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-links">
                  {config.social.instagram && (
                    <a href={`https://instagram.com/${config.social.instagram}`} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  )}
                  {config.social.facebook && (
                    <a href={`https://facebook.com/${config.social.facebook}`} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  )}
                  {config.social.linkedin && (
                    <a href={`https://linkedin.com/company/${config.social.linkedin}`} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  )}
                  {config.social.youtube && (
                    <a href={`https://youtube.com/@${config.social.youtube}`} target="_blank" rel="noopener noreferrer">
                      YouTube
                    </a>
                  )}
                  {config.social.tiktok && (
                    <a href={`https://tiktok.com/@${config.social.tiktok}`} target="_blank" rel="noopener noreferrer">
                      TikTok
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {config.business.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
