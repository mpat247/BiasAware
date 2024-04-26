// NavigationBar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Tooltip } from 'antd';
import { HomeOutlined, BarChartOutlined, SettingOutlined, EnvironmentOutlined, PictureOutlined } from '@ant-design/icons';

import './NavigationBar.css';

const Brand = ({ isCentered }) => (
  <motion.div id="brand-container" className={`brand-container ${isCentered ? 'centered' : ''}`}>
    <div className="brand">Exploring the Dark Net</div>
  </motion.div>
);

const LinkItem = ({ to, icon, label, isMobile, iconStyle, linkStyle, tooltip }) => (
  <Menu.Item key={to} icon={isMobile && icon}>
    <Tooltip
      title={tooltip || label}
      overlayInnerStyle={{
        backgroundColor: "#0B0533", // Ensure tooltip styling is correct
        color: "#DD9313",
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}
    >
      <Link 
        to={to} 
        className={`nav-link ${isMobile ? 'mobile' : 'desktop'}`} 
        style={isMobile ? iconStyle : linkStyle}
      >
        {isMobile ? '' : label}
      </Link>
    </Tooltip>
  </Menu.Item>
);




const NavMenu = ({ current, handleClick, isMobile, iconStyle, linkStyle, mobileStyle }) => (
  <motion.div id="navMenu" style={{ display: 'flex', alignItems: 'center' }}>
<Menu
  onClick={handleClick}
  selectedKeys={[current]}
  mode="horizontal"
  theme="dark"
  className="menu"
  style={{ backgroundColor: "transparent", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
  // overflowedIndicator={null}
>      <LinkItem to="/" icon={<HomeOutlined style={{ ...iconStyle, ...(isMobile && mobileStyle) }} />} label="Home" isMobile={isMobile} iconStyle={iconStyle} linkStyle={linkStyle} tooltip="Go to Home Page" />
      <LinkItem to="/Engineering" icon={<SettingOutlined style={{ ...iconStyle, ...(isMobile && mobileStyle) }} />} label="Engineering" isMobile={isMobile} iconStyle={iconStyle} linkStyle={linkStyle} tooltip="Explore Engineering" />
      <LinkItem to="/Neighborhood" icon={<EnvironmentOutlined style={{ ...iconStyle, ...(isMobile && mobileStyle) }} />} label="Neighbourhood" isMobile={isMobile} iconStyle={iconStyle} linkStyle={linkStyle} tooltip="View Neighbourhood" />
      <LinkItem to="/Statistics" icon={<BarChartOutlined style={{ ...iconStyle, ...(isMobile && mobileStyle) }} />} label="Statistics" isMobile={isMobile} iconStyle={iconStyle} linkStyle={linkStyle} tooltip="View Statistics" />

      {/* <LinkItem to="/GalleriesLanding" icon={<PictureOutlined style={{ ...iconStyle, ...(isMobile && mobileStyle) }} />} label="Gallery" isMobile={isMobile} iconStyle={iconStyle} linkStyle={linkStyle} tooltip="View Gallery" /> */}
    </Menu>
  </motion.div>
);




const NavigationBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNavMenuUnderBrand, setIsNavMenuUnderBrand] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateUI = () => {
      setIsSticky(window.scrollY > window.innerHeight);
      setIsMobile(window.innerWidth < 768);
      const brandRect = document.getElementById("brand-container").getBoundingClientRect();
      const navMenuRect = document.getElementById("navMenu").getBoundingClientRect();
      setIsNavMenuUnderBrand(navMenuRect.top > brandRect.bottom);
    };

    window.addEventListener('scroll', updateUI);
    window.addEventListener('resize', updateUI);
    updateUI(); // Initialize UI on mount

    return () => {
      window.removeEventListener('scroll', updateUI);
      window.removeEventListener('resize', updateUI);
    };
  }, []);

  const [current, setCurrent] = useState(location.pathname);
  useEffect(() => setCurrent(location.pathname), [location]);

  const handleClick = e => setCurrent(e.key);

  return (
    <motion.nav className={`navbar ${isSticky ? 'sticky' : ''} ${isMobile ? 'mobile-view' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={isMobile ? { flexDirection: 'column' } : {}}
>
    <Brand isCentered={isNavMenuUnderBrand} />
    <NavMenu current={current} handleClick={handleClick} isMobile={isMobile} iconStyle={{ fontSize: '1.5rem' }} linkStyle={{
        textDecoration: 'none',
        color: 'white',
        fontWeight: 'bold',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        position: 'relative',
        transition: 'color 0.3s ease, transform 0.3s ease-out',
        whiteSpace: 'nowrap',
        fontSize: '1.0rem',
      }} mobileStyle={{ fontSize: '1.2rem' }} />
</motion.nav>

  );
};

export default NavigationBar;