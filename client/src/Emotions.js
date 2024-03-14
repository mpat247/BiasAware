import React, { useState, useEffect } from 'react';
import './Emotions.css'; // Assuming the CSS file is named Emotions.css
import axios from 'axios'; // Import Axios for making HTTP requests

const PopupCard = ({ image, onClose, retrievedImage }) => (
  <div className="popup-card">
    <div className="popup-content">
      <img src={image} alt="selected-emotion" className="popup-image" />
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="image1"></div>
      <div className="image2"></div>
      <div className="rectanglepop1"></div>
      <div className="image3"></div>
      <div className="image4"></div>
      <div className="rectanglepop3"></div>
      <div>
        {retrievedImage && <img src={retrievedImage} alt="retrieved-emotion" />}
      </div>
      <div className="rectanglepop2"></div>
      <div className="rectanglepop5"></div>
    </div>
  </div>
);

const Emotions = () => {
  const emotionMap = {
    happy: "/emotions/1happy.png",
    sad: "/emotions/2sad.png",
    angry: "/emotions/3angry.png",
    loved: "/emotions/4loved.png",
    confused: "/emotions/5confused.png",
    cautious: "/emotions/6cautious.png",
    depressed: "/emotions/7depressed.png",
    irritated: "/emotions/8irritated.png",
    energetic: "/emotions/9energetic.png",
    confident: "/emotions/10confident.png",
    disappointed: "/emotions/11disappointed.png",
    proud: "/emotions/12proud.png",
    grateful: "/emotions/13grateful.png",
    jealous: "/emotions/14jealous.png",
    optimistic: "/emotions/15optimistic.png",
    resourceful: "/emotions/16resourceful.png",
    regretful: "/emotions/17regretful.png",
    empowered: "/emotions/18empowered.png",
    discouraged: "/emotions/19discouraged.png",
    hated: "/emotions/20hated.png"
  };

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [retrievedImages, setRetrievedImages] = useState([]);
  const [retrievedImage, setRetrievedImage] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/emotions/main-images');
        setRetrievedImages(response.data.images);

        // Create a mapping between emotions and retrieved images based on the prompt field
        const emotionToImageMap = {};
        response.data.images.forEach(image => {
          Object.keys(emotionMap).forEach(emotion => {
            if (image.prompt.toLowerCase().includes(emotion)) {
              emotionToImageMap[emotion] = image.url;
            }
          });
        });
        console.log('Emotion to Image Mapping:', emotionToImageMap);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleClick = (emotion) => {
    const imagePath = emotionMap[emotion];
    setSelectedImage(imagePath);
    setSelectedEmotion(emotion);

    // Find and set the retrieved image based on the selected emotion
    const retrievedImage = retrievedImages.find(image => image.prompt.toLowerCase().includes(emotion));
    if (retrievedImage) {
      setRetrievedImage(retrievedImage.url);
    } else {
      console.error('No image found for the selected emotion:', emotion);
    }

    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setSelectedImage(null);
    setSelectedEmotion(null);
    setRetrievedImage(null);
  };

  return (
    <div className="emotions-page">
      <h1 style={{
        color: '#DD9313',
        fontFamily: 'Abhaya Libre ExtraBold',
        fontSize: '4em',
        textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
        textAlign: 'center',
        margin: '0',
        padding: '50px 0'
      }}>
        E M O T I O N S
      </h1>
      <div className="rectangle">
        <div className="title">I   AM   FEELING </div>
      </div>
      <div className="rectangleback1"></div>
      <div className="rectangle2">
        <div className="image-grid">
          {Object.keys(emotionMap).map((emotion, index) => (
            <button key={index} className="emotion-button" onClick={() => handleClick(emotion)}>
              <img src={emotionMap[emotion]} alt={`emotion-${index}`} className="emotion-image" />
            </button>
          ))}
        </div>
      </div>
      {showPopup && <div className="overlay" onClick={handleClose}></div>}
      {showPopup && <PopupCard image={selectedImage} onClose={handleClose} retrievedImage={retrievedImage} />}
      <div className="rectangleback2"></div>
      {/* Print the first retrieved image at the bottom for testing */}
      {retrievedImages.length > 0 && (
        <img src={retrievedImages[0].url} alt="first-retrieved-image" style={{ display: 'block', margin: '20px auto' }} />
      )}
    </div>
  );
};

export default Emotions;
