import React, { useState, useEffect } from 'react';
import axios from 'axios';
import REACT_APP_API_URL from './config';
import GearLoader from './GearLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';



const QOL = () => {
  const [bottomLeftSquares, setBottomLeftSquares] = useState([]);
  const [bottomRightSquares, setBottomRightSquares] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [bottomLeftImages, setBottomLeftImages] = useState([]);
  const [bottomRightImages, setBottomRightImages] = useState([]);
  const [toShowLeft, setToShowLeft] = useState([]);
  const [toShowRight, setToShowRight] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // Add isFetching state
  const [currentPage, setCurrentPage] = useState(1);


  const API_URL = REACT_APP_API_URL;

  useEffect(() => {
    async function fetchImages(page) {
      setIsFetching(true);
      try {
        const [leftResponse, rightResponse] = await Promise.all([
          axios.get(`${API_URL}/qol/main`, { params: { page, limit: 12 } }),
          axios.get(`${API_URL}/qol/main2`, { params: { page, limit: 12 } })
        ]);

        // Update the state with the new images
        setBottomLeftImages(leftResponse.data.images);
        setBottomRightImages(rightResponse.data.images);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchImages(currentPage);
  }, [API_URL, currentPage]);  // Depend on currentPage to refetch when it changes

  // Example function to advance to the next page of images periodically or on an event
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage(currentPage => currentPage + 1);  // Increment page every set interval
    }, 15000);  // Fetch new images every 30 seconds

    return () => clearInterval(intervalId);
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

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    zIndex: 100, // Ensure it's above other content
  };

  return (
    <div style={{ backgroundColor: '#0B0533', position: 'relative', height: '110vh' }}>
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
      

      {/* Overlay Loader */}
      {/* {isFetching && (
        <div style={overlayStyle}>
          <GearLoader />
        </div>
      )} */}


        <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: '20px auto', marginTop: '-10px', width: '60vw' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '30vw', height: '5vw', backgroundColor: '#B3BBC8', margin: '10px', borderRadius: '10px' }}></div>
            <div style={{ width: '30vw', height: '5vw', backgroundColor: '#B3BBC8', margin: '10px', borderRadius: '10px' }}></div>
          </div>


            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={containerStyle}>
                {toShowLeft.map((image, index) => (
                  <LazyLoadImage
                    key={index}
                    src={image.imageData}
                    alt={image.prompt}
                    onClick={() => handleBoxClick(image)}
                    style={imageStyle}
                  />
                ))}
              </div>
              <div style={containerStyle}>
                {toShowRight.map((image, index) => (
                  <LazyLoadImage
                    key={index}
                    src={image.imageData}
                    alt={image.prompt}
                    onClick={() => handleBoxClick(image)}
                    style={imageStyle}
                  />
                ))}
              </div>
            </div>
        </div>

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
              style={{
                position: 'absolute',
                top: '5px', // Adjusted as per your `.close-button-addiction` CSS
                right: '5px', // Adjusted as per your `.close-button-addiction` CSS
                borderRadius: '5px',
                cursor: 'pointer',
                padding: '3px 8px', // Adjusted as per your `.close-button-addiction` CSS
                background: '#a8a8a8', // Keeping your color as specified
                border: 'none',
                color: 'white',
                zIndex: 1000, // Added from your previous CSS to ensure it's on top
                pointerEvents: 'auto' // Ensure the button is clickable
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QOL;