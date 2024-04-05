// Addictions.js

import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios';
import { Helmet } from 'react-helmet';
const PopupCard = ({ image, onClose }) => (
  <div className="popup-card-addiction">
    <div className="popup-content-addiction">
      <img src={image} alt="selected-addiction" className="popup-image-addiction" />
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="rectanglepop1-addiction"></div>
      <div className="rectanglepop2-addiction"></div>
      <div className="rectanglepop3-addiction"></div>
      <div className="image1-addiction"></div>
      <div className="image2-addiction"></div>
      <div className="image3-addiction"></div>
      <div className="image4-addiction"></div>
      <div className="image5-addiction"></div>
    </div>
  </div>
);

const Addictions = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/addictions/main-images');
        setImages(response.data.images);
        setLoading(false); // Set loading to false once images are fetched
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

  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
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
    return (
      <div className="image-component">
        <img src={src} alt={alt} onClick={() => openPopup()} />
      </div>
    );
  };

  return (
    <div id="addictions" className="Addictions">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Helmet>
      <header className="App-header">
      
        
        {loading ? (
          <div>Loading...</div> // Show loading indicator while images are being fetched
        ) : (
          <div className="addictions-container">
            <h1 className="addictions-header">
              A D D I C T I O N S
            </h1>
            <div className="images-container-addiction" style={{ display: 'flex' }}>
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
        )}
      </header>
      {showPopup && <div className="overlay" onClick={closePopup}></div>}
      {showPopup && <PopupCard onClose={closePopup} />}
      
    </div>
  );
};

export default Addictions;
