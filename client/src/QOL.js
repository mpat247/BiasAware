import React, { useState, useEffect } from 'react';
import axios from 'axios';
import REACT_APP_API_URL from './config';
import GearLoader from './GearLoader';

const QOL = () => {
  const [bottomLeftSquares, setBottomLeftSquares] = useState([]);
  const [bottomRightSquares, setBottomRightSquares] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [bottomLeftImages, setBottomLeftImages] = useState([]);
  const [bottomRightImages, setBottomRightImages] = useState([]);
  const [toShowLeft, setToShowLeft] = useState([]);
  const [toShowRight, setToShowRight] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // Add isFetching state


  const API_URL = REACT_APP_API_URL;

  useEffect(() => {
    setIsFetching(true); // Set isFetching to true before fetching data
function fetchImages() {
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

}
fetchImages();
setIsFetching(false); // Set isFetching to true before fetching data
    


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

  // Adjusted style for the image containers
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '28vw',
    height: '30vw',
    backgroundColor: '#BFBFBF',
    margin: 'auto',
    borderRadius: '20px'
  };

  // Dynamic image style to ensure responsiveness and fit within the grid
  const imageStyle = {
    width: 'calc(50% - 10px)', // Subtracting margin
    height: 'calc(50% - 10px)', // Adjusting for a 2x2 grid within the container
    margin: '5px',
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '20px',
  };

  return (
    <div style={{ backgroundColor: '#0B0533', position: 'relative' }}>
      <h1 style={{
        color: '#DD9313',
        fontFamily: 'Crimson Text',
        fontWeight: 'bolder',
        fontSize: '7vw',
        textAlign: 'center',
        padding: '50px 0',
      }}>
        QUALITY OF LIFE
      </h1>
      {/* Conditional rendering for the loading spinner */}
      {isFetching ? (
        <div
          className="loader-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: '#0B0533',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <GearLoader />
        </div>
      ) : (
        <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: '20px auto', marginTop: '-10px', width: '60vw' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '30vw', height: '5vw', backgroundColor: '#B3BBC8', margin: '10px', borderRadius: '10px' }}></div>
            <div style={{ width: '30vw', height: '5vw', backgroundColor: '#B3BBC8', margin: '10px', borderRadius: '10px' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={containerStyle}>
              {toShowLeft.map((image, index) => (
                <img key={index} src={image.imageData} alt={image.prompt} onClick={() => handleBoxClick(image)} style={imageStyle} />
              ))}
            </div>
            <div style={containerStyle}>
              {toShowRight.map((image, index) => (
                <img key={index} src={image.imageData} alt={image.prompt} onClick={() => handleBoxClick(image)} style={imageStyle} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popup */}
      {selectedBox && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: 9998, // Ensure it's below the popup
            backgroundColor: '#0B0533' // Semi-transparent black background
          }}
        >
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#D9D9D9',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
            zIndex: 9999,
            width: '600px',
            height: '500px',
            overlay: "#D9D9D9"
          }}
        >
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 'bolder',
            padding: '8px',
            borderRadius: '5px',
            width: '400px',
            margin: '0 auto'
            
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bolder'

            }}>{selectedBox.prompt}</h2>
          </div>
          <img src={selectedBox.imageData} alt={selectedBox.prompt} style={{
            width: '100%',
            height: '22vw',
            borderRadius: '20px',
            objectFit: 'contain', // Ensure the image maintains its aspect ratio without stretching
            display: 'block',  // Display block to avoid inline extra space
            margin: 'auto'  // Center the image horizontally

          }} />
          <div style={{
            textAlign: 'center',
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '5px',
            fontFamily: 'Plus Jakarta Sans',

            width: '400px',
            margin: '0 auto'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '0.7rem',

            }}>{selectedBox.description}</h2>
              <a
                href="/Statistics"
                className="statistics-link-qol"
                style={{
                  textDecoration: 'none',
                  color: '#a3a0a9', // Choose a color that fits your design
                  padding: '10px 20px',
                  borderRadius: '5px',
                  textAlign: 'center',
                  display: 'grid', // Makes it a block element to fill the width
                  marginTop: '0px', // Space from the content above
                  fontSize: '0.8rem',
                  transition: 'background-color 0.3s', // Smooth background color change on hover
                }}
              >
                More Information Here
              </a>
          </div>
          <button
            onClick={closePopup}
            style={{ position: 'absolute', top: '10px', right: '10px', borderRadius: '5px', cursor: 'pointer', padding: '5px 10px', background: '#a8a8a8', border: 'none', color: 'white' }}
          >
            x
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QOL;