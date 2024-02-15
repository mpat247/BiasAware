import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css'; // Import the corresponding CSS file

const Addictions = () => {
  const images = [
    "/addictions/Add_P6_V4_S.png",
    "/addictions/Add_P10_V5_N.jpg",
    "/addictions/Add_P9_V4_N.jpg",
    "/addictions/Add_P18_V2_N.jpg",
    "/addictions/Add_P27_V3_N.jpg",
    "/addictions/Add_P23_V3_N.jpg",
    "/addictions/Add_P20_V4_N.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const getCurrentImages = () => {
    const currentImage = images[currentImageIndex];
    const prevImage1 = images[(currentImageIndex - 1 + images.length) % images.length];
    const prevImage2 = images[(currentImageIndex - 2 + images.length) % images.length];

    return [prevImage2, prevImage1, currentImage];
  };

  return (
    <div id="addictions" className="Addictions">
      <NavigationBar />
      <header className="App-header">
        <div className="addictions-container">
          <h1 style={{ 
            color: '#DD9313', 
            fontFamily: 'Abhaya Libre ExtraBold', 
            fontSize: '4em', 
            marginTop: '-10px', 
            marginRight: '100px',
            textShadow: '2px 2px 4px rgba(168, 108, 6, 1)' // Updated text shadow with white color
          }}>
            A D D I C T I O N S
          </h1>
          <div style={{ display: 'flex' }}>
            {getCurrentImages().map((image, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  width: '300px',
                  height: '450px',
                  marginRight: '20px',
                  overflow: 'hidden',
                }}
              >
                {index === 2 ? (
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '30px',
                      objectFit: 'cover',
                      position: 'absolute',
                      left: '-50%', // Move the next image to the side
                    }}
                    src={image}
                    alt={`Addictions Illustration ${currentImageIndex + index}`}
                  />
                ) : (
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '30px',
                      objectFit: 'cover',
                    }}
                    src={image}
                    alt={`Addictions Illustration ${currentImageIndex + index}`}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className="arrow-button"
            style={{
              marginTop: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: '#DD9313',
              cursor: 'pointer',
            }}
            onClick={nextImage}
          >
            ➡ Show Next
          </button>
        </div>
      </header>
    </div>
  );
};

export default Addictions;