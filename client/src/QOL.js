// QOL.js
import React, { useState, useEffect } from 'react';

const QOL = () => {
    const [bottomLeftSquares, setBottomLeftSquares] = useState([]);
  const [bottomRightSquares, setBottomRightSquares] = useState([]);

  useEffect(() => {
    // Function to generate random color for squares
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Function to generate squares for the bottom-left and bottom-right
    const generateSquares = () => {
      const bottomLeftSet = Array.from({ length: 4 }, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Array.from({ length: 4 }, (_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: getRandomColor(),
                margin: '5px',
              }}
            ></div>
          ))}
        </div>
      ));

      const bottomRightSet = Array.from({ length: 4 }, (_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {Array.from({ length: 4 }, (_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: getRandomColor(),
                margin: '5px',
              }}
            ></div>
          ))}
        </div>
      ));

      setBottomLeftSquares(bottomLeftSet);
      setBottomRightSquares(bottomRightSet);
    };

    // Initial generation of squares
    generateSquares();

    // Set interval to refresh squares every 10 seconds
    const intervalId = setInterval(() => {
      generateSquares();
    }, 10000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount
  return (
    <div style={{ backgroundColor: '#0B0533' }}>
      {/* Your QOL content goes here */}
      <h1 style={{
                color: '#DD9313',
                fontFamily: 'Abhaya Libre ExtraBold',
                fontSize: '4em',
                textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
                textAlign: 'center',
                margin: '0',
                padding: '50px 0'
            }}>
                Q U A L I T Y     O F     L I F E 
            </h1>
      {/* Enclosing box for the four smaller boxes */}
      <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: '70px', width: '1000px', marginLeft: '250px' }}>
        {/* Rectangles */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Small rectangles at the top */}
          <div style={{ width: '500px', height: '100px', backgroundColor: '#B3BBC8', margin: '10px' }}></div>
          <div style={{ width: '500px', height: '100px', backgroundColor: '#B3BBC8', margin: '10px' }}></div>
        </div>

        {/* Add your QOL content/components as needed */}

        {/* Rectangles */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          {/* Big rectangles at the bottom */}
          <div style={{ width: '500px', height: '450px', backgroundColor: '#BFBFBF', margin: '10px' }}>
          {bottomLeftSquares}
          </div>
          <div style={{ width: '500px', height: '450px', backgroundColor: '#BFBFBF', margin: '10px' }}>
          {bottomRightSquares}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QOL;