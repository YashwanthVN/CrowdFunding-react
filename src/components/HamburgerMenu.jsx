import React from "react";
import { Sling as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";

const HamburgerMenu = ({ isOpen, setOpen }) => {
  return (
    <motion.div
      className="z-50"
      whileHover={{ scale: 1.15 }}   // hover effect
      whileTap={{ scale: 0.9 }}      // click effect
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        size={28}
        color="#3b82f6" // Bright yellow (change if you want theme match)
        rounded         // makes the bars slightly rounded (Apple-like)
      />
    </motion.div>
  );
};

export default HamburgerMenu;
