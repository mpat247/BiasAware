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
    "/emotions/1happy.png",
    "/emotions/2sad.png",
    "/emotions/3angry.png",
    "/emotions/4loved.png",
    "/emotions/5confused.png",
    "/emotions/6cautious.png",
    "/emotions/7depressed.png",
    "/emotions/8irritated.png",
    "/emotions/9energetic.png",
    "/emotions/10confident.png",
    "/emotions/11disappointed.png",
    "/emotions/12proud.png",
    "/emotions/13grateful.png",
    "/emotions/14jealous.png",
    "/emotions/15optimistic.png",
    "/emotions/16resourceful.png",
    "/emotions/17regretful.png",
    "/emotions/18empowered.png",
    "/emotions/19discouraged.png",
    "/emotions/20hated.png"
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/emotions/main');
        setImages(response.data.images);
      } catch (error) {
        console.error('Failed to fetch main images:', error);
      }
    };

    fetchImages();
  }, []);

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
      <h1 style={{
                color: '#DD9313',
                fontFamily: 'Abhaya Libre ExtraBold',
                fontSize: '4em',
                textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
                textAlign: 'center',
                margin: '0',
                padding: '50px 0'
            }}>
E M O T I O N S             </h1>
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
