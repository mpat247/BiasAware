import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios';

const PopupCard = ({ image, onClose }) => (
  <div className="popup-card">
    <div className="popup-content">
      <img src={image} alt="selected-addiction" className="popup-image" />
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="rectanglepop1"></div>
      <div className="rectanglepop2"></div>
      <div className="rectanglepop3"></div>
      <div className="image1"></div>
      <div className="image2"></div>
      <div className="image3"></div>
      <div className="image4"></div>
      <div className="image5"></div>
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
  };

  const closePopup = () => {
    setShowPopup(false);
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
      <header className="App-header">
        <NavigationBar />
        {loading ? (
          <div>Loading...</div> // Show loading indicator while images are being fetched
        ) : (
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
        )}
      </header>
      {showPopup && <PopupCard onClose={closePopup} />}
    </div>
  );
};

export default Addictions;
