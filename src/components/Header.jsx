import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/venture_forge.svg";
import HamburgerMenu from "../components/HamburgerMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-blue-600 text-white shadow-md relative">
      {/* Top bar */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Hamburger */}
        <HamburgerMenu isOpen={menuOpen} setOpen={setMenuOpen} />

        {/* Center: Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Venture Forge Logo" className="h-10" />
        </Link>

        {/* Right: Placeholder (keeps logo centered) */}
        <div className="w-8"></div>
      </div>

      {/* Dark backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar sliding in from left */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white shadow-lg transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-blue-500">
          <span className="font-bold text-lg">Menu</span>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          <li>
            <Link
              to="/"
              className={`hover:text-blue-200 ${
                location.pathname === "/" ? "font-semibold underline" : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/create-project"
              className={`hover:text-blue-200 ${
                location.pathname === "/create-project"
                  ? "font-semibold underline"
                  : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Create Project
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`hover:text-blue-200 ${
                location.pathname === "/dashboard"
                  ? "font-semibold underline"
                  : ""
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`hover:text-blue-200 ${
                location.pathname === "/login"
                  ? "font-semibold underline"
                  : ""
              }`}
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
