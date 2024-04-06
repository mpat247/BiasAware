import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios';
import REACT_APP_API_URL from './config.js';

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to get initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const Addictions = () => {
  const [imagesData, setImagesData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupPrompt, setPopupPrompt] = useState('');
  const [popupDescription, setPopupDescription] = useState('');
  const [popUpMain, setPopUpMain] = useState([]);
  const [sideImagesData, setSideImagesData] = useState([]);
  const [popUpSide, setPopUpSide] = useState([]);
  const width = useWindowSize().width; // Directly extracting width

  const API = REACT_APP_API_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const mainResponse = await axios.get(`${API}/addictions/main-images`);
        const sideResponse = await axios.get(`${API}/addictions/side-images`);
        setImagesData(mainResponse.data.images);
        setSideImagesData(sideResponse.data.images);
        setLoading(false); // Set loading to false once images are fetched
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1
    );
  };

  const openPopup = (prompt, description) => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
    const mainImage = imagesData.find(image => image.prompt === prompt)?.image;
    setPopUpMain([mainImage]); // Assuming mainImage is an array
    const sideImages = sideImagesData.filter(image => image.prompt === prompt).map(image => image.image);
    setPopUpSide(sideImages);
    setPopupPrompt(prompt);
    setPopupDescription(description);
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  const displayLogic = () => {
    let className = '';
    if (width > 768) {
      className = 'five-images';
    } else if (width > 480) {
      className = 'three-images';
    } else {
      className = 'one-image';
    }

    const visibleImages = imagesData.slice(currentImageIndex, currentImageIndex + className.split('-')[0]);
    if (visibleImages.length < className.split('-')[0]) {
      visibleImages.push(...imagesData.slice(0, className.split('-')[0] - visibleImages.length));
    }

    return (
      <div className={`${className} images-wrapper`}>
        {visibleImages.map((image, index) => (
          <div key={index} className="image-component" onClick={() => openPopup(image.prompt, image.description)}>
            <img src={image.url} alt={`Addiction ${index + 1}`} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="Addictions">
      <NavigationBar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="addictions-container">
          <h1>A D D I C T I O N S</h1>
          {displayLogic()}
          <button className="arrow-button arrow-button-left" onClick={previousImage}>
            <img src={ArrowLeftImage} alt="Left Arrow" />
          </button>
          <button className="arrow-button arrow-button-right" onClick={nextImage}>
            <img src={ArrowRightImage} alt="Right Arrow" />
          </button>
        </div>
      )}
      {showPopup && (
        <div className="popup-wrapper">
          <div className="popup-card">
            <button className="close-button" onClick={closePopup}>Close</button>
            <h2>{popupPrompt}</h2>
            <p>{popupDescription}</p>
            <img src={popUpMain[0]} alt="Main" />
            {popUpSide.map((image, index) => <img key={index} src={image} alt={`Side ${index}`} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Addictions;
