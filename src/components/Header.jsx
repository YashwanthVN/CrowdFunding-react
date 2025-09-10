import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/venture_forge.svg";
import HamburgerMenu from "./HamburgerMenu";

// Custom icons
import homeIcon from "../assets/home.png";
import createIcon from "../assets/createproject.png";
import dashboardIcon from "../assets/dashboard.png";
import logoutIcon from "../assets/logout.png";

import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: homeIcon },
    { path: "/create-project", label: "Create Project", icon: createIcon },
    { path: "/dashboard", label: "Dashboard", icon: dashboardIcon },
    { path: "/login", label: "Login", icon: logoutIcon },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Hamburger */}
        <div className="hamburger-wrapper">
          <HamburgerMenu isOpen={menuOpen} setOpen={setMenuOpen} />
        </div>

        {/* Center: Logo */}
        <Link to="/">
          <img src={logo} alt="Venture Forge Logo" className="logo" />
        </Link>
      </div>

      {/* Sidebar + Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="overlay"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.nav
              className="sidebar"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ul className="sidebar-list">
                {navLinks.map((link, index) => (
                  <li key={link.path} className="sidebar-item">
                    <Link
                      to={link.path}
                      className={`sidebar-link ${
                        location.pathname === link.path ? "active" : ""
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <img src={link.icon} alt={link.label} className="sidebar-icon" />
                      <span>{link.label}</span>
                    </Link>
                    {index === 0 && <div className="sidebar-divider"></div>}
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
