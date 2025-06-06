// Addictions.js

import React, { useState, useEffect } from 'react';
import Loader from './GearLoader.js';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios';
import REACT_APP_API_URL from './config.js';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // optional for blur effect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


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
  const [sideImagesLoading, setSideImagesLoading] = useState(false);



  const API = REACT_APP_API_URL;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const mainResponse = await axios.get(`${API}/addictions/main-images`);
        setImagesData(mainResponse.data.images);
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

  const PopupCard = ({ image, prompt, sideImages, onClose, retrievedImage, description, sideImagesLoading }) => {
    console.log("Side Images: ", sideImages);
  
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
    console.log("Filled Side Images: ", filledSideImages);
  
    return (
      <div className="popup-card-addiction">
        <div className="popup-content-addiction">
          <button className="close-button-addiction" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div className="image-layout-addiction">
            <div className="side-images-addictions left">
              {sideImagesLoading ? (
                <Loader /> 
              ) : (
                filledSideImages.slice(0, 2).map((sideImage, index) => (
                  <div key={index} className="side-image-addictions">
                    <LazyLoadImage
                      src={sideImage.image}
                      alt={`sideImage ${index + 1}`}
                      className="side-image-addictions"
                      effect="blur"
                      placeholderSrc="path_to_loading_placeholder.jpg"
                    />
                  </div>
                ))
              )}
            </div>
            <div className="main-image-container-addictions">
              {image && (
                <LazyLoadImage
                  src={image}
                  alt="Selected Addiction"
                  className="retrieved-image-centered-addictions"
                  effect="blur"
                  placeholderSrc="path_to_loading_placeholder.jpg"
                />
              )}
              {prompt && <div className="prompt-text-addictions">{formattedPrompt(prompt)}</div>}
              {description && <div className="description-text-addictions">{description}</div>}
            </div>
            <div className="side-images-addictions right">
              {sideImagesLoading ? (
                <Loader />
              ) : (
                filledSideImages.slice(2, 4).map((sideImage, index) => (
                  <div key={index} className="side-image-addictions">
                    <LazyLoadImage
                      src={sideImage.image}
                      alt={`sideImage ${index + 1}`}
                      className="side-image-addictions"
                      effect="blur"
                      placeholderSrc="path_to_loading_placeholder.jpg"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
  
          <a href="/Statistics" className="statistics-link-emotions">More Information Here</a>
        </div>
      </div>
    );
  };


  const openPopup = async (prompt, description) => {
    document.body.style.overflow = 'hidden'; // Disable scrolling
    setPopupPrompt(prompt);
    setpopupDescription(description);
    const mainImage = imagesData.find(image => image.prompt === prompt)?.image;
    setPopUpMain([mainImage]);
    setSideImagesLoading(true); // Start loading side images
    setShowPopup(true);

    // Find the main image corresponding to the prompt
  
      try {
      const sideResponse = await axios.get(`${API}/addictions/side-images`, {
        params: {
          prompt: prompt // Make sure to pass the prompt as a query parameter
        }
      });
      // Assuming the backend responds with an array of images under the 'images' key
      const fetchedSideImages = sideResponse.data.images || [];
  
      // Ensure to only set the side images related to the current prompt, matching the backend structure
      const sideImages = fetchedSideImages.map(img => ({
        image: img.image,
        prompt: img.prompt,
        description: img.description
      }));
  
      setPopUpSide(sideImages);
    } catch (error) {
      console.error('Failed to fetch side images:', error);
      setPopUpSide([]); // Reset to an empty array in case of an error
    } finally {
      setSideImagesLoading(false); // Ensure loading indicator is removed after fetching

    }
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

  const ImageComponent = ({ src, alt, prompt, description, onClick }) => {
    return (
        <div className="image-component" onClick={() => onClick(prompt, description)}>
            <LazyLoadImage
                src={src}
                alt={alt}
            />
        </div>
    );
};




  return (
    <div id="addictions" className="Addictions">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </Helmet>
      <header className="App-header">
        <div className="addictions-container">
          <h1 className="addictions-header">
            ADDICTIONS
          </h1>
          {loading ? (
              <Loader /> 
          ) : (
            <div style={{ display: 'flex' }}>
              {getCurrentImages().map((image, index) => (
                <ImageComponent
                  key={index}
                  src={image.image}
                  alt={`Addictions Illustration ${currentImageIndex + index - 2}`}
                  prompt={image.prompt}
                  description={image.description}
                  onClick={(prompt, description) => openPopup(prompt, description)} // Ensure openPopup function is correctly implemented
                />
              ))}
            </div>
          )}
          {!loading && (
            <>
              <button className="arrow-button arrow-button-left" onClick={previousImage}>
                <img src={ArrowLeftImage} alt="Left Arrow" />
              </button>
              <button className="arrow-button arrow-button-right" onClick={nextImage}>
                <img src={ArrowRightImage} alt="Right Arrow" />
              </button>
            </>
          )}
        </div>
      </header>
      {showPopup && <div className="overlay-addiction" onClick={closePopup}></div>}
      {showPopup && (
        <PopupCard
          image={popUpMain[0]}
          prompt={popupPrompt}
          sideImages={popUpSide}
          onClose={closePopup}
          description={popupDescription}
          sideImagesLoading={sideImagesLoading}
        />
      )}
    </div>
  );
};

export default Addictions;