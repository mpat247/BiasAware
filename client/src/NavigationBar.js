// NavigationBar.js
import React from 'react';
import './NavigationBar.css'; // Create a CSS file for styling if needed

const NavigationBar = () => {
  return (
    <nav className="navbar">
    <div className="brand">Exploring the Dark Net</div>
    <div className="nav-links">
      <a href="#">Home</a>
      <a href="#">Statistics</a>
      <a href="#">Engineering</a>
      <a href="#">Gallery</a>
    </div>
  </nav>
  );
};

export default NavigationBar;
