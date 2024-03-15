// App.js
import { FaArrowUp } from 'react-icons/fa'; // Assuming you are using react-icons for icons
import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import Addictions from './Addictions';
import Activities from './Activities';
import QOL from './QOL'; // Import the QOL component
import Crime from './Crime';

const Home = () => {
  const [rotate, setRotate] = useState(true);

   // Add a function to handle scrolling to the top
   const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotate(false); // Stop the rotation after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="Home">
      <header className="App-header">
        <NavigationBar /> {/* Include the NavigationBar component */}
         {/* Add a link to scroll to the Addictions section */}
         <a href="#addictions" style={{ color: 'white', textDecoration: 'none',
        fontFamily: 'Abhaya Libre ExtraBold', 
        fontSize: '3em',
        zindex:10}}>
          <h2>A Shopahpolic</h2>
        </a>
        <a href="#qol" style={{ color: 'white', textDecoration: 'none', fontFamily: 'Abhaya Libre ExtraBold', fontSize: '3em', zIndex: 10 }}>
          <h2>Quality of Life</h2>
        </a>
        <a href="#crime" style={{ color: 'white', textDecoration: 'none', fontFamily: 'Abhaya Libre ExtraBold', fontSize: '3em', zIndex: 10 }}>
          <h2>Crime</h2>
        </a>

        {/* <h1 style={{ 
  color: '#DD9313',
  fontFamily: 'Abhaya Libre ExtraBold', 
  fontSize: '4em',
  textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
  textAlign: 'center', // Centers the text horizontally
  margin: '0', // Removes any default margin
  padding: '50px 0' // Adjust this padding to control spacing above and below the text
}}>
  A C T I V I T I E S
</h1> */}
        <a href="#activities" style={{ color: 'white', textDecoration: 'none',
        fontFamily: 'Abhaya Libre ExtraBold', 
        fontSize: '3em',
        zindex:10}}>
          <h2>A Basketball Player</h2>
        </a>
      </header>

      <main>
        <div className="gear-container">
          <img
            style={{
              width: '33vw',
              height: '33vw',
              position: 'absolute',
              top: '15%',
              left: '35%',
              transform: 'translateX(-50%)'
            }}
            
            className={`App-logo App-logo.middle-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
            
            src="/gears/gearLeft.png"
            alt="Rotating Gear"
          />
          <img
            style={{
              width: '26vw',
              height: '26vw',
              position: 'absolute',
              bottom: '28%',
              right: '14%',
              transform: 'translateY(-50%)'
            }}
            className={`App-logo App-logo.right-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
            src="/gears/gearLeft.png"
            alt="Rotating Gear"
          />
          <img
            style={{
              width: '22vw',
              height: '22vw',
              position: 'absolute',
              top: '9%',
              left: '22.5%',
              transform: 'translateY(-50%)'
            }}
            className={`App-logo App-logo.top-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
            src="/gears/gearRight.png"
            alt="Rotating Gear"
          />
          <img
            style={{
              width: '22vw',
              height: '22vw',
              position: 'absolute',
              bottom: '-4%',
              left: '28%',
              transform: 'translateY(-50%)'
            }}
            className={`App-logo App-logo.bottom-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
            src="/gears/gearRight.png"
            alt="Rotating Gear"
          />
        </div>

       
        {/* Add a link to scroll to the Addictions section
        <tr><a href="#addictions" className="explore-addictions-link">
          <h2>Explore Addictions</h2>
        </a></tr>
        <tr><a href="#activities" className="explore-activities-link">
          <h2>Explore Activities</h2>
        </a></tr> */}

 {/* Add the scroll-to-top button/icon */}
 <button className="scroll-to-top-button" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
        
      </main>

      {/* Addictions section */}
      <div id="addictions">
        <Addictions />
      </div>

      {/* Activities section */}
      <div id="activities">
        <Activities />
      </div>

      {/* Quality of Life section */}
      <div id="qol">
        <QOL />
      </div>
      {/* Crime section */}
      <div id="crime">
        <Crime />
      </div>
    </div>
  );
};

export default Home;
