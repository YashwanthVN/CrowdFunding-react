import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/venture_forge.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center z-10">
        <Link to="/">
          <img src={logo} alt="Venture Forge Logo" className="h-10" />
        </Link>
      </div>
      <button 
        className="toggle-button" 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6h16M4 12h16m-7 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <nav className={`toggle-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link 
              to="/" 
              className={`hover:text-blue-200 ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/create-project" 
              className={`hover:text-blue-200 ${location.pathname === '/create-project' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Create Project
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard" 
              className={`hover:text-blue-200 ${location.pathname === '/dashboard' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`hover:text-blue-200 ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;