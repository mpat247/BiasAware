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
    const currentImageIndex1 = currentImageIndex;
    const currentImageIndex2 = (currentImageIndex + 1) % images.length;
    const currentImageIndex3 = (currentImageIndex + 2) % images.length;
    const currentImageIndex4 = (currentImageIndex + 3) % images.length;

    return [
      images[currentImageIndex1],
      images[currentImageIndex2],
      images[currentImageIndex3],
      images[currentImageIndex4]
    ];
  };

  return (
    <div id="addictions" className="Addictions">
      <NavigationBar />
      <header className="App-header">
        <div className="addictions-container">
          <h1>A D D I C T I O N S</h1>
          <div>
            {getCurrentImages().map((image, index) => (
              <div
                key={index}
                style={{
                  marginRight: index === 3 ? '-150px' : '20px',
                }}
                className={index === 2 ? 'centered-image' : 'regular-image'}
              >
                <img
                  src={image}
                  alt={`Addictions Illustration ${currentImageIndex + index}`}
                />
              </div>
            ))}
          </div>
          <button className="arrow-button" onClick={nextImage}>
            ➡ Show Next
          </button>
        </div>
      </header>
    </div>
  );
};

export default Addictions;
