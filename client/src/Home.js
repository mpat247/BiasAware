// App.js
import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import Addictions from './Addictions';

const Home = () => {
  const [rotate, setRotate] = useState(true);

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

        {/* Add a link to scroll to the Addictions section */}
        <a href="#addictions" className="explore-addictions-link">
          <h2>Explore Addictions</h2>
        </a>
      </main>

      {/* Add the Addictions component with an id */}
      <Addictions id="addictions" />
    </div>
  );
};

export default Home;
