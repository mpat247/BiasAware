// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
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
    <motion.nav className="navbar">
      <div className="brand-container">
        <div className="brand">Exploring the Dark Net</div>
      </div>
      <motion.div className="nav-links-container">
        <div className="nav-links">
          <Link to="/">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Home</motion.a>
          </Link>
          <Link to="/Statistics">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Statistics</motion.a>
          </Link>
          <Link to="/Engineering">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Engineering</motion.a>
          </Link>
          <Link to="/Gallery">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Gallery</motion.a>
          </Link>
          <Link to="/Neighborhood"> {/* Add this line */}
            <motion.a href="#" variants={linkVariants} whileHover="hover">Neighborhood</motion.a> {/* Add this line */}
          </Link> {/* Add this line */}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavigationBar;
