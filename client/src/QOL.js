import React, { useState, useEffect } from 'react';
import axios from 'axios';
import REACT_APP_API_URL from './config';

const QOL = () => {
  const [bottomLeftSquares, setBottomLeftSquares] = useState([]);
  const [bottomRightSquares, setBottomRightSquares] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [bottomLeftImages, setBottomLeftImages] = useState([]);
  const [bottomRightImages, setBottomRightImages] = useState([]);
  const [toShowLeft, setToShowLeft] = useState([]);
  const [toShowRight, setToShowRight] = useState([]);

  const API_URL = REACT_APP_API_URL;

  useEffect(() => {
    const fetchLeftImages = async () => {
      try {
        console.log(API_URL)
          const response = await axios.get(`${API_URL}/qol/main`);

          const fetchedLeftImages = response.data.images.filter(image => image.ImageData && image.prompt && image.description);

          console.log("Response:", response.data.images);
          console.log("Filtered Images:", fetchedLeftImages);

          const imagesToSave = fetchedLeftImages.map(image => ({
              imageData: image.ImageData,
              prompt: image.prompt,
              description: image.description

          }));

          console.log("Images to save:", imagesToSave);

          setBottomLeftImages(response.data.images); // Save the filtered images in state
      } catch (error) {
          console.error('Failed to fetch main images:', error);
      }
  };

  const fetchRightImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/qol/main2`);

        const fetchedRightImages = response.data.images.filter(image => image.ImageData && image.prompt && image.description);

        console.log("Response:", response);
        console.log("Filtered Images:", fetchedRightImages);

        const imagesToSave = fetchedRightImages.map(image => ({
            imageData: image.ImageData,
            prompt: image.prompt,
            description: image.description
        }));

        console.log("Images to save:", imagesToSave);

        setBottomRightImages(response.data.images); // Save the filtered images in state
    } catch (error) {
        console.error('Failed to fetch main images:', error);
    }
};

    fetchLeftImages();
    fetchRightImages();

}, []); 


    
// Function to select 4 random images
const getRandomImages = (images) => {
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};

useEffect(() => {
  // Initially set random images to display
  setToShowLeft(getRandomImages(bottomLeftImages));
  setToShowRight(getRandomImages(bottomRightImages));

  // Update displayed images every 7 seconds
  const intervalId = setInterval(() => {
    setToShowLeft(getRandomImages(bottomLeftImages));
    setToShowRight(getRandomImages(bottomRightImages));
  }, 7000);

  return () => clearInterval(intervalId);
}, [bottomLeftImages, bottomRightImages]);


const handleBoxClick = (image) => {
  setSelectedBox(image); // Set the clicked image details for the popup
  document.body.style.overflow = 'hidden'; // Disable scrolling when the popup is open
};


  const closePopup = () => {
    setSelectedBox(null);
    // Enable scrolling when the popup is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <div style={{ backgroundColor: '#0B0533', position: 'relative' }}>
      <h1 style={{
        color: '#DD9313',
        fontFamily: 'Abhaya Libre ExtraBold',
        fontSize: '7vw',
        textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
        textAlign: 'center',
        padding: '50px 0',
      }}>
        QUALITY OF LIFE
      </h1>
      <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: '20px auto', width: '60vw' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '28vw', height: '30vw', backgroundColor: '#BFBFBF', margin: 'auto' }}>
            {toShowLeft.map((image, index) => (
              <img key={index} src={image.imageData} alt={image.prompt} onClick={() => handleBoxClick(image)} style={{ width: '13vw', height: '13vw', margin: '5px', objectFit: 'cover', cursor: 'pointer' }}/>
            ))}
          </div>
          <div style={{ width: '28vw', height: '30vw', backgroundColor: '#BFBFBF', margin: 'auto' }}>
            {toShowRight.map((image, index) => (
              <img key={index} src={image.imageData} alt={image.prompt} onClick={() => handleBoxClick(image)} style={{ width: '13vw', height: '13vw', margin: '5px', objectFit: 'cover', cursor: 'pointer' }}/>
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      {selectedBox && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#080328',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            width: '600px',
            height: '500px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '30px', padding: '10px', borderRadius: '5px', backgroundColor: '#B3BBC8', width: '400px', margin: '0 auto' }}>
            <h2 style={{ margin: 0 }}>{selectedBox.prompt}</h2>
          </div>
          <img src={selectedBox.imageData} alt={selectedBox.prompt} style={{ width: '100%', height: 'auto' }}/>
          <div style={{ textAlign: 'center', marginBottom: '30px', padding: '10px', borderRadius: '5px', backgroundColor: '#B3BBC8', width: '400px', margin: '0 auto' }}>
            <h2 style={{ margin: 0 }}>{selectedBox.description}</h2>
          </div>
          <button
            onClick={closePopup}
            style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'white' }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default QOL;
