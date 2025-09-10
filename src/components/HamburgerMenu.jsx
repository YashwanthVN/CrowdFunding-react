import React from "react";
import { Sling as Hamburger } from "hamburger-react";

const HamburgerMenu = ({ isOpen, setOpen }) => {
  return (
    <div className="z-50">
      <Hamburger
        toggled={isOpen}
        toggle={setOpen}
        size={28}
        color="#3b82f6"
      />
    </div>
  );
};

export default HamburgerMenu;
