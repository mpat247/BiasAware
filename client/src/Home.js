import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar'; // Confirm the path
import Addictions from './Addictions'; // Confirm the path
import { FaArrowUp } from 'react-icons/fa'; // Confirm you are using react-icons

const Home = () => {
  const [rotate, setRotate] = useState(true);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Set a timeout to stop the rotation of gears
    const timeout = setTimeout(() => {
      setRotate(false);
    }, 5000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      <NavigationBar /> {/* Render the navigation bar */}
      <header className="App-header">
        {/* Gears with conditional class for animation */}
        <img
          className={`App-logo middle-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/gears/gearMiddle.png"
          alt="Middle Gear"
        />
        <img
          className={`App-logo left-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/gears/gearLeft.png"
          alt="Left Gear"
        />
        <img
          className={`App-logo right-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/gears/gearRight.png"
          alt="Right Gear"
        />
        {/* Bottom-right gear, using the same image as the right gear */}
        <img
          className={`App-logo bottom-right-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/gears/gearRight.png"
          alt="Bottom Right Gear"
        />
      </header>
      <main>
        {/* Other content goes here */}
        <a href="#addictions" className="App-link">
          Explore Addictions
        </a>
        {/* Scroll-to-top button */}
        <button className="scroll-to-top-button" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      </main>
      {/* Addictions component with ID for anchor link targeting */}
      <Addictions id="addictions" />
    </div>
  );
};

export default Home;
