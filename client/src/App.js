// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [rotate, setRotate] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotate(false); // Stop the rotation after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          className={`App-logo ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/image32.png" // Update the path to your gear icon
          alt="Rotating Gear"
        />
        <img
          className={`App-logo ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/image32.png" // Update the path to your gear icon
          alt="Rotating Gear"
        />
        <img
          className={`App-logo ${rotate ? 'rotating-gear' : 'stopped-rotation'}`}
          src="/image32.png" // Update the path to your gear icon
          alt="Rotating Gear"
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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

export default App;
