import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationBarStyling from './NavigationBarStyling.module.css'; // Import CSS module

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
    <motion.nav className={NavigationBarStyling["navbar"]}>
      <div className={NavigationBarStyling["brand-container"]}>
        <div className={NavigationBarStyling["brand"]}>Exploring the Dark Net</div>
      </div>
      <motion.div className={NavigationBarStyling["nav-links-container"]}>
        <div className={NavigationBarStyling["nav-links"]}>
          <Link to="/">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Home</motion.a>
          </Link>
          <Link to="/Statistics">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Statistics</motion.a>
          </Link>
          <Link to="/Engineering">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Engineering</motion.a>
          </Link>

          <Link to="/Neighborhood">
            <motion.a href="#" variants={linkVariants} whileHover="hover">Neighborhood</motion.a>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavigationBar;
