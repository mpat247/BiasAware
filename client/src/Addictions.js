import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from ".//Arrows/Arrow_Left_1.png"; // replace with the actual path
import ArrowRightImage from ".//Arrows/Arrow_Right_1.png"; // replace with the actual path
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

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getCurrentImages = () => {
    const currentImageIndex1 = (currentImageIndex + images.length - 1) % images.length;
    const currentImageIndex2 = currentImageIndex;
    const currentImageIndex3 = (currentImageIndex + 1) % images.length;
    const currentImageIndex4 = (currentImageIndex + 2) % images.length;
    const currentImageIndex5 = (currentImageIndex + 3) % images.length;

    return [
      images[currentImageIndex1],
      images[currentImageIndex2],
      images[currentImageIndex3],
      images[currentImageIndex4],
      images[currentImageIndex5]
    ];
  };

  const ImageComponent = ({ src, alt }) => {
    return (
      <div className="image-component">
        <img src={src} alt={alt} />
      </div>
    );
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
            textShadow: '2px 2px 4px rgba(168, 108, 6, 1)'
          }}>
            A D D I C T I O N S
          </h1>
          <div style={{ display: 'flex' }}>
            {getCurrentImages().map((image, index) => (
              <ImageComponent
                key={index}
                src={image}
                alt={`Addictions Illustration ${currentImageIndex + index}`}
              />
            ))}
          </div>
          <button className="arrow-button arrow-button-left" onClick={previousImage}>
          <img src={ArrowLeftImage} alt="Left Arrow" />
        </button>
        <button className="arrow-button arrow-button-right" onClick={nextImage}>
          <img src={ArrowRightImage} alt="Right Arrow" />
        </button>
        </div>
      </header>
    </div>
  );
};

export default Addictions;
