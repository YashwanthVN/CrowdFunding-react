import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/venture_forge.svg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path to highlight the active link

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col lg:flex-row items-center justify-center">
        <Link to="/" className="mb-4 lg:mb-0">
          <img 
            src={logo} 
            alt="Venture Forge Logo"
            className="h-10"
          />
        </Link>
        <button 
          className="lg:hidden focus:outline-none ml-auto" 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        <ul className={`lg:flex lg:space-x-4 ${menuOpen ? 'block' : 'hidden'} space-y-4 lg:space-y-0 lg:block absolute lg:static bg-blue-600 lg:bg-transparent top-16 right-4 lg:right-auto p-4 lg:p-0 rounded-lg lg:rounded-none w-48 lg:w-auto`}>
          <li>
            <Link 
              to="/" 
              className={`block hover:text-blue-200 ${location.pathname === '/' ? 'font-bold' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/create-project" 
              className={`block hover:text-blue-200 ${location.pathname === '/create-project' ? 'font-bold' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Create Project
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard" 
              className={`block hover:text-blue-200 ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`block hover:text-blue-200 ${location.pathname === '/login' ? 'font-bold' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;