import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/venture_forge_transparent.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path to highlight the active link

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Replace text with clickable image */}
        <Link to="/">
          <img 
            src={logo}// Replace with your image path
            alt="Venture Forge Logo"
            className="h-12"  // You can adjust the height or other styles of the image
          />
        </Link>
        <button 
          className="lg:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <ul className={`lg:flex lg:space-x-4 ${menuOpen ? 'block' : 'hidden'} space-y-4 lg:space-y-0 lg:block`}>
          <li>
            <Link 
              to="/" 
              className={`hover:text-blue-200 ${location.pathname === '/' ? 'font-bold' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/create-project" 
              className={`hover:text-blue-200 ${location.pathname === '/create-project' ? 'font-bold' : ''}`}
            >
              Start a Project
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard" 
              className={`hover:text-blue-200 ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`hover:text-blue-200 ${location.pathname === '/login' ? 'font-bold' : ''}`}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
