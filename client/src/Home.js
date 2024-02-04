// App.js
import React, { useState, useEffect } from 'react';
import './Home.css';

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
        <img
          className={`App-logo ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/gears/gearLeft.png" // Update the path to your gear icon
          alt="Rotating Gear"
        />
        <img
          className={`App-logo ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/gears/gearRight.png" // Update the path to your gear icon
          alt="Rotating Gear"
        />
        <p>
          Edit <code>src/Home.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default Home;
