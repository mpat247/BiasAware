// Emotions.js

import React, { useState, useEffect } from 'react';
import './Emotions.css';
import axios from 'axios';

const PopupCard = ({ onClose, retrievedImage, prompt,description, sideImages }) => {
  return (
    <div className="popup-card-emotions">
      <div className="popup-content-emotions">
        <button className="close-button-emotions" onClick={onClose}>x</button>
        <div className="image-layout-emotions">
          <div className="side-images-emotions left">
            {sideImages.slice(0, 2).map((img, index) => (
              <img key={index} src={img.image} alt={`side-emotion-left-${index}`} className="side-image-emotions" />
            ))}
          </div>
          <div className="main-image-container-emotions">
          {prompt && <div className="prompt-text-emotions">{prompt}</div>}

            {retrievedImage && <img src={retrievedImage} alt="retrieved-emotion" className="retrieved-image-centered-emotions" />}
            {description && <div className="description-text-emotions">{description}</div>}

          </div>
          <div className="side-images-emotions right">
            {sideImages.slice(2, 4).map((img, index) => (
              <img key={index} src={img.image} alt={`side-emotion-right-${index}`} className="side-image-emotions" />
            ))}
          </div>

        </div>
        <a href="/Statistics" className="statistics-link-emotions">More Information Here</a>

      </div>
    </div>
  );
};

const Emotions = () => {
  const emotionMap = {
    happy: "/emotions/1happy.png",
    sad: "/emotions/2sad.png",
    angry: "/emotions/3angry.png",
    loved: "/emotions/4loved.png",
    confused: "/emotions/5confused.png",
    cautious: "/emotions/6cautious.png",
    Depressed: "/emotions/7depressed.png",
    Annoyed: "/emotions/8irritated.png",
    energetic: "/emotions/9energetic.png",
    disappointed: "/emotions/11disappointed.png",
    confident: "/emotions/10confident.png",
    proud: "/emotions/12proud.png",
    grateful: "/emotions/13grateful.png",
    jealous: "/emotions/14jealous.png",
    optimistic: "/emotions/15optimistic.png",
    remorseful: "/emotions/16remorseful.png",
    regretful: "/emotions/17regretful.png",
    empowered: "/emotions/18empowered.png",
    discouraged: "/emotions/19discouraged.png",
    hated: "/emotions/20hated.png"
  };

  const [showPopup, setShowPopup] = useState(false);
  const [retrievedImages, setRetrievedImages] = useState([]);
  const [sideImages, setSideImages] = useState([]);
  const [retrievedImage, setRetrievedImage] = useState('');
  const [PopUpPrompt, setPopUpPrompt] = useState('');
  const [displaySideImages, setDisplaySideImages] = useState([]);
  const [PopUpDescription, setPopUpDescription] = useState('');


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const responseMain = await axios.get('http://localhost:3001/emotions/main');
        const responseSide = await axios.get('http://localhost:3001/emotions/side');
        if (responseMain.data && responseMain.data.images) {
          setRetrievedImages(responseMain.data.images);
        }
        if (responseSide.data && responseSide.data.images) {
          setSideImages(responseSide.data.images);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleClick = (emotion, prompt, description) => {
    const imageObj = retrievedImages.find(image => image.emotion?.toLowerCase().trim() === emotion.toLowerCase().trim());
    if (imageObj) {
      setRetrievedImage(imageObj.image);
      setPopUpPrompt(imageObj.prompt);
      setPopUpDescription(imageObj.description);

      const relatedSideImages = sideImages.filter(img => img.emotion === imageObj.emotion);
      setDisplaySideImages(relatedSideImages);

      setShowPopup(true);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setRetrievedImage('');
    setPopUpPrompt('');
    setPopUpDescription('');
    setDisplaySideImages([]);
  };

  return (
    <div className="emotions-page">
      <div className="background-rectangle-top"></div>
      <div className="emotion-top-rectangle">
        <h1 className="emotion-title">I AM FEELING</h1>
      </div>
      <div className="background-rectangle-bottom"></div>
      <div className="emotion-rectangle2">
        <div className="image-grid">
          {Object.keys(emotionMap).map((emotion, index) => (
            <button key={index} className="emotion-button" onClick={() => handleClick(emotion, emotionMap[emotion])}>
              <img src={emotionMap[emotion]} alt={`emotion-${index}`} className="emotion-image" />
            </button>
          ))}
        </div>
      </div>
      {showPopup && <div className="emotions-overlay" onClick={handleClose}></div>}
      {showPopup && <PopupCard onClose={handleClose} retrievedImage={retrievedImage} prompt={PopUpPrompt} description={PopUpDescription} sideImages={displaySideImages} />}
    </div>
  

  );
};

export default Emotions;