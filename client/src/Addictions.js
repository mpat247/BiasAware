import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios'; // Make sure to install axios for making HTTP requests

const Addictions = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/addictions/main-images');
        setImages(response.data.images);
        console.log(response.data.images);
      } catch (error) {
        console.error('Failed to fetch main images:', error);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const getCurrentImages = () => {
    return [
      images[(currentImageIndex + images.length - 2) % images.length],
      images[(currentImageIndex + images.length - 1) % images.length],
      images[currentImageIndex],
      images[(currentImageIndex + 1) % images.length],
      images[(currentImageIndex + 2) % images.length]
    ];
  };

  const ImageComponent = ({ src, alt }) => {
    console.log('Image src:', src); // Debugging statement
    return (
      <div className="image-component">
        <img src={src} alt={alt} />
      </div>
    );
  };

  console.log('Current images:', getCurrentImages()); // Debugging statement

  return (
    <div id="addictions" className="Addictions">
      <header className="App-header">
        <NavigationBar />
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
                alt={`Addictions Illustration ${currentImageIndex + index - 2}`}
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
