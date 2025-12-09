import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const scrollToSection = (id) => {
    if (!isHome) return;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🏠</span> Real Trust
        </Link>
        
        <div className="nav-menu">
          {isHome ? (
            <>
              <button onClick={() => scrollToSection('home')} className="nav-link">HOME</button>
              <button onClick={() => navigate('/admin')} className="nav-link">Admin</button>
              <button onClick={() => scrollToSection('projects')} className="nav-link">ABOUT PROJECTS</button>
              <button onClick={() => scrollToSection('clients')} className="nav-link">TESTIMONIALS</button>
            </>
          ) : (
            <Link to="/" className="nav-link">BACK TO HOME</Link>
          )}
        </div>

        <button onClick={() => scrollToSection('contact')} className="nav-contact-btn">
          CONTACT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
