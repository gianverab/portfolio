import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { images } from "../../constants";
import { MenuItems } from "../../lib/types";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  // Convert enum into an array
  const menuItems: string[] = Object.values(MenuItems);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href="#home">
          <img src={images.logo} alt="Gianverab's logo" />
        </a>
      </div>
      <ul className="app__navbar-links">
        {menuItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a
              href={`#${item.toLowerCase()}`}
              onClick={() => handleMenuItemClick(item.toLowerCase())}
              style={
                activeMenuItem === item.toLowerCase()
                  ? { color: "#313bac" }
                  : {}
              }
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div className="app__navbar-menu">
        <HiMenu onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {menuItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setToggle(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
