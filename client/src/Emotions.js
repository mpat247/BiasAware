import React, { useState, useEffect } from 'react';
import './Emotions.css';
import axios from 'axios';

const PopupCard = ({ onClose, retrievedImage, prompt }) => {
  console.log("PopupCard prompt:", prompt);
  return (
    <div className="popup-card">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="rectanglepop7">
          {retrievedImage && <img src={retrievedImage} alt="retrieved-emotion" className="retrieved-image-centered" />}
          {prompt && <div className="prompt-text">{prompt}</div>}
        </div>
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
  const [retrievedImage, setRetrievedImage] = useState('');
  const [PopUpPrompt, setPopUpPrompt] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/emotions/main');
        if (response && response.data.images) {
          console.log('Fetched images:', response.data.images);
          setRetrievedImages(response.data.images);
        } else {
          console.error('No response received from the server.');
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };
    fetchImages();
  }, []);

  const handleClick = (emotion, prompt) => {
    console.log(`Clicked emotion: ${emotion}`);
    console.log(`Clicked prompt: ${prompt}`);
    console.log('Available emotions in retrieved images:', retrievedImages.map((img, index) => ({ index, emotion: img.emotion })));
  
    const imageObj = retrievedImages.find(image => {
      const imageEmotionNormalized = image.emotion?.toLowerCase().trim();
      const clickedEmotionNormalized = emotion.toLowerCase().trim();
      return imageEmotionNormalized.includes(clickedEmotionNormalized);
    });
  
    if (imageObj) {
      console.log(`Matching image found for "${emotion}":`, imageObj);
      setRetrievedImage(imageObj.image); // Assuming 'image' correctly points to the image URL
      setPopUpPrompt(imageObj.prompt); // Now also setting the prompt for display
      setShowPopup(true);
    } else {
      console.error(`No matching image found for "${emotion}".`);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setRetrievedImage('');
    setPopUpPrompt('');
  };

  return (
    <div className="emotions-page">
      <div className="rectangle2">
        <div className="image-grid">
          {Object.keys(emotionMap).map((emotion, index) => (
            <button key={index} className="emotion-button" onClick={() => handleClick(emotion, emotionMap[emotion])}>
              <img src={emotionMap[emotion]} alt={`emotion-${index}`} className="emotion-image" />
            </button>
          ))}
        </div>
      </div>
      {showPopup && <div className="overlay" onClick={handleClose}></div>}
      {showPopup && <PopupCard onClose={handleClose} retrievedImage={retrievedImage} prompt={PopUpPrompt} />}
    </div>
  );
};

export default Emotions;
