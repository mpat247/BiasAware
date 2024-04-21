import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'antd';
import { HomeOutlined, BarChartOutlined, ToolOutlined, EnvironmentOutlined } from '@ant-design/icons';
import './NavigationBar.css'; // Updated CSS import

const NavigationBar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [current, setCurrent] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = e => {
    setCurrent(e.key);
  };

  return (
    <motion.nav className={`navbar ${isSticky ? 'sticky' : ''}`} // Updated class name
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="brand-container"> 
        <div className="brand">Exploring the Dark Net</div> 
      </div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="dark" className="menu"> 
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="statistics" icon={<BarChartOutlined />}>
          <Link to="/Statistics">Statistics</Link>
        </Menu.Item>
        <Menu.Item key="engineering" icon={<ToolOutlined />}>
          <Link to="/Engineering">Engineering</Link>
        </Menu.Item>
        <Menu.Item key="neighborhood" icon={<EnvironmentOutlined />}>
          <Link to="/Neighborhood">Neighborhood</Link>
        </Menu.Item>
      </Menu>
    </motion.nav>
  );
};

export default NavigationBar;
