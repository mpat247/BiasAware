// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { motion } from 'framer-motion';
import './NavigationBar.css';

const linkVariants = {
  hover: {
    scale: 1.05,
    color: "#F5A720",
    transition: {
      duration: 0.2,
      yoyo: Infinity
    },
  },
};

const NavigationBar = () => {
  return (
    <motion.nav className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
    >
      <div className="brand-container">
        <div className="brand">Exploring the Dark Net</div>
      </div>
      <motion.div className="nav-links-container"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 50, damping: 15 }}
      >
        <div className="nav-links">
          <Link to="/"> {/* Use Link component for navigation */}
            <motion.a href="#" variants={linkVariants} whileHover="hover">Home</motion.a>
          </Link>
          <Link to="/Statistics"> {/* Use Link component for navigation */}
            <motion.a href="#" variants={linkVariants} whileHover="hover">Statistics</motion.a>
          </Link>
          <Link to="/Engineering"> {/* Use Link component for navigation */}
            <motion.a href="#" variants={linkVariants} whileHover="hover">Engineering</motion.a>
          </Link>
          <Link to="/Gallery"> {/* Use Link component for navigation */}
            <motion.a href="#" variants={linkVariants} whileHover="hover">Gallery</motion.a>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavigationBar;
