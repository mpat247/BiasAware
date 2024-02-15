// NavigationBar.js
import React from 'react';
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
//import { Link } from 'react-router-dom';

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
          <motion.a href="#" variants={linkVariants} whileHover="hover">Home</motion.a>
          <motion.a href="#" variants={linkVariants} whileHover="hover">Statistics</motion.a>
          <motion.a href="#" variants={linkVariants} whileHover="hover">Engineering</motion.a>
          <motion.a href="#" variants={linkVariants} whileHover="hover">Gallery</motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavigationBar;
