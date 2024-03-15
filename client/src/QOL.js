import React, { useState, useEffect } from 'react';

const QOL = () => {
  const [bottomLeftSquares, setBottomLeftSquares] = useState([]);
  const [bottomRightSquares, setBottomRightSquares] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);

  useEffect(() => {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

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
                cursor: 'pointer', // Added cursor pointer
              }}
              onClick={() => handleBoxClick('bottomLeft', rowIndex, colIndex)} // Added click handler
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
                cursor: 'pointer', // Added cursor pointer
              }}
              onClick={() => handleBoxClick('bottomRight', rowIndex, colIndex)} // Added click handler
            ></div>
          ))}
        </div>
      ));

      setBottomLeftSquares(bottomLeftSet);
      setBottomRightSquares(bottomRightSet);
    };

    generateSquares();

    const intervalId = setInterval(() => {
      generateSquares();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleBoxClick = (section, row, col) => {
    setSelectedBox({ section, row, col });
    // Disable scrolling when the popup is open
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedBox(null);
    // Enable scrolling when the popup is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <div style={{ backgroundColor: '#0B0533', position: 'relative' }}>
<<<<<<< HEAD
<h1 style={{
  color: '#DD9313',
  fontFamily: 'Abhaya Libre ExtraBold',
  fontSize: '4em',
  textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
  textAlign: 'center',
  margin: '0',
  padding: '50px 0'
}}>
  Q U A L I T Y&nbsp;&nbsp;&nbsp;O F&nbsp;&nbsp;&nbsp;L I F E
</h1>

      <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: 'auto', width: '1000px'}}>
=======
      <h1>Quality of Life Page</h1>

      <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: '70px', width: '1000px', marginLeft: '250px' }}>
>>>>>>> origin/QOL
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ width: '500px', height: '100px', backgroundColor: '#B3BBC8', margin: '10px' }}></div>
          <div style={{ width: '500px', height: '100px', backgroundColor: '#B3BBC8', margin: '10px' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          <div style={{ width: '500px', height: '450px', backgroundColor: '#BFBFBF', margin: '10px' }}>
            {bottomLeftSquares}
          </div>
          <div style={{ width: '500px', height: '450px', backgroundColor: '#BFBFBF', margin: '10px' }}>
            {bottomRightSquares}
          </div>
        </div>
      </div>

      {/* Semi-transparent overlay */}
      {selectedBox && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
            zIndex: 9998, // Behind the popup
          }}
        />
      )}

      {/* Popup */}
      {selectedBox && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#080328',
            padding: '30px', // Increased padding for a larger size
            borderRadius: '10px', // Increased border radius for a smoother look
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            width: '600px', // Increased width
            height: '500px',
          }}
        >
          {/* Title Box */}
    <div style={{ textAlign: 'center', marginBottom: '30px', padding: '10px', borderRadius: '5px', backgroundColor: '#B3BBC8', width: '400px', margin: '0 auto' }}>
      <h2 style={{ margin: 0 }}>Title</h2>
    </div>

    {/* Additional Box 1 */}
    <div style={{ backgroundColor: '#B3BBC8', padding: '20px', borderRadius: '10px', margin: '20px auto 0 auto', width: '350px', height: '300px' }}>
      {/* Content of the additional box */}
    </div>

    {/* Additional Box 2 */}
    <div style={{ backgroundColor: '#B3BBC8', padding: '20px', borderRadius: '10px', margin: '20px auto 0 auto', width: '350px', height: '50px' }}>
      {/* Content of the additional box */}
    </div>
          <button
            onClick={closePopup}
            style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'white' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default QOL;
