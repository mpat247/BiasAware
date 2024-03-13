import React, { useState } from 'react';
import './Emotions.css'; // Assuming the CSS file is named Emotions.css

const PopupCard = ({ image, onClose }) => (
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
      <div className="image5"></div>
      <div className="rectanglepop2"></div>
      <div className="rectanglepop5"></div>
    </div>
  </div>
);

const Emotions = () => {
  const images = [
    "/emotions/Group 137.png",
    "/emotions/Group 138.png",
    "/emotions/Group 139.png",
    "/emotions/Group 140.png",
    "/emotions/Group 141.png",
    "/emotions/Group 142.png",
    "/emotions/Group 143.png",
    "/emotions/Group 144.png",
    "/emotions/Group 145.png",
    "/emotions/Group 146.png",
    "/emotions/Group 147.png",
    "/emotions/Group 149.png",
    "/emotions/Group 150.png",
    "/emotions/Group 151.png",
    "/emotions/Group 152.png",
    "/emotions/Group 153.png",
    "/emotions/Group 154.png",
    "/emotions/Group 155.png",
    "/emotions/Group 156.png",
    "/emotions/Group 157.png"
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (image) => {
    setSelectedImage(image);
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
    setSelectedImage(null);
  };
  
  return (
    <div className="emotions-page">
      <div className="rectangle">
        <div className="title">I   AM   FEELING </div>
      </div>
      <div className="rectangleback1"></div>
      <div className="rectangle2">
        <div className="image-grid">
          {images.map((image, index) => (
            <button key={index} className="emotion-button" onClick={() => handleClick(image)}>
              <img src={image} alt={`emotion-${index}`} className="emotion-image" />
            </button>
          ))}
        </div>
      </div>
      {showPopup && <div className="overlay" onClick={handleClose}></div>}
      {showPopup && <PopupCard image={selectedImage} onClose={handleClose} />}
      <div className="rectangleback2"></div>
    </div>
  );
};

export default Emotions;
