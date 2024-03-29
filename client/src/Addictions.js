import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios';
import REACT_APP_API_URL from './config.js';

const Addictions = () => {
  const [imagesData, setImagesData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupPrompt, setPopupPrompt] = useState('');
  const [popUpMain, setPopUpMain] = useState([]);
  const [sideImagesData, setSideImagesData] = useState([]);
  const [popUpSide, setPopUpSide] = useState([]);
  const [popupDescription, setpopupDescription] = useState('');


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

  const PopupCard = ({ image, prompt, sideImages, onClose, description }) => {
    const formattedPrompt = prompt => {
      const vowels = ['a', 'e', 'i', 'o', 'u'];
      const firstLetter = prompt.toLowerCase().charAt(0);
      if (vowels.includes(firstLetter)) {
        return `An ${prompt} Dependent Individual`;
      } else {
        return `A ${prompt} Dependent Individual`;
      }
    };
    
    // Fill the sideImages array with empty strings if there are fewer than 4 side images
    const filledSideImages = [...sideImages, '', '', '', ''].slice(0, 4);
  
    return (
      <div className="popup-card">
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>Close</button>
          <div className="rectanglepop1"></div>
          <div className="rectanglepop2"></div>
          <div className="rectanglepop3">
            <div><p className="popup-prompt" style={{ textAlign: 'center' }}>{formattedPrompt(prompt)}</p></div>
            <div><p className="popup-description" style={{ textAlign: 'center' }}>{description}</p></div>

          </div>
          {filledSideImages.map((sideImage, index) => (
            <div key={index} className={`image${index + 1}`}>
              <img src={sideImage} alt={`sideImage${index + 1}`} className="popup-image" />
            </div>
          ))}

<div className="image5"><img src={image} alt="selected-addiction" className="popup-image" /></div>

        </div>
      </div>
    );
  };
  

  const openPopup = async (prompt, description) => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Disable scrolling
    setPopupPrompt(prompt);
    setpopupDescription(description); // Correct this line to properly set the description
  
    // Find the main image corresponding to the prompt
    const mainImage = imagesData.find(image => image.prompt === prompt)?.image;
    setPopUpMain([mainImage]);
  
    // Find the side images corresponding to the prompt
    const sideImages = sideImagesData.filter(image => image.prompt === prompt).map(image => image.image);
    setPopUpSide(sideImages);
  };
  
  

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  const getCurrentImages = () => {
    return [
      imagesData[(currentImageIndex + imagesData.length - 2) % imagesData.length],
      imagesData[(currentImageIndex + imagesData.length - 1) % imagesData.length],
      imagesData[currentImageIndex],
      imagesData[(currentImageIndex + 1) % imagesData.length],
      imagesData[(currentImageIndex + 2) % imagesData.length]
    ];
  };

  const ImageComponent = ({ src, alt, prompt, description }) => {
    return (
      <div className="image-component">
        <img src={src} alt={alt} onClick={() => openPopup(prompt,description)} />
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
                  src={image.image}
                  alt={`Addictions Illustration ${currentImageIndex + index - 2}`}
                  prompt={image.prompt}
                  description={image.description}
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
      {showPopup && <PopupCard image={popUpMain[0]} prompt={popupPrompt} sideImages={popUpSide} onClose={closePopup} description={popupDescription} />}
    </div>
  );
};

export default Addictions;
