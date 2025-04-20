import React, { useState, useEffect } from 'react';
import axios from 'axios';
import REACT_APP_API_URL from './config';
import GearLoader from './GearLoader';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './QOL.css';

const QOL = () => {
  const [bottomLeftImages, setBottomLeftImages] = useState([]);
  const [bottomRightImages, setBottomRightImages] = useState([]);
  const [toShowLeft, setToShowLeft] = useState([]);
  const [toShowRight, setToShowRight] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetching2, setIsFetching2] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const API_URL = REACT_APP_API_URL;
  var count = 0;
  useEffect(() => {
    async function fetchImages(page) {
      setIsFetching(true);
      try {
        const [leftResponse, rightResponse] = await Promise.all([
          axios.get(`${API_URL}/qol/main`, { params: { page, limit: 12 } }),
          axios.get(`${API_URL}/qol/main2`, { params: { page, limit: 12 } })
        ]);
        setBottomLeftImages(leftResponse.data.images);
        setBottomRightImages(rightResponse.data.images);
        count++;

      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        if (count!= 0) {
          setIsFetching2(false);
        }
        setIsFetching(false);
      }
    }
    fetchImages(currentPage);
  }, [API_URL, currentPage, count, isFetching2]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage(currentPage => currentPage + 1);
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const getRandomImages = (images) => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  useEffect(() => {
    setToShowLeft(getRandomImages(bottomLeftImages));
    setToShowRight(getRandomImages(bottomRightImages));
    const intervalId = setInterval(() => {
      setToShowLeft(getRandomImages(bottomLeftImages));
      setToShowRight(getRandomImages(bottomRightImages));
    }, 7000);
    return () => clearInterval(intervalId);
  }, [bottomLeftImages, bottomRightImages]);

  const handleBoxClick = (image) => {
    setSelectedBox(image);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setSelectedBox(null);
    document.body.style.overflow = 'auto';
  };

    return (
      <div className="qol-main-container">
        <h1 className="qol-title">QUALITY OF LIFE</h1>

        {isFetching2 ? (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

            <GearLoader />
</div>
        ) : (

        <div className="qol-image-container-wrapper">
          <div className="qol-flex-container">
            <div className="qol-flex-item"></div>
            <div className="qol-flex-item"></div>
          </div>
          <div className="qol-flex-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  
    <div className="qol-image-container">
      {toShowLeft.map((image, index) => (
        <LazyLoadImage
          key={index}
          src={image.imageData}
          alt={image.prompt}
          onClick={() => handleBoxClick(image)}
          className="qol-image"
        />
      ))}
    </div>
  
    <div className="qol-image-container">
      {toShowRight.map((image, index) => (
        <LazyLoadImage
          key={index}
          src={image.imageData}
          alt={image.prompt}
          onClick={() => handleBoxClick(image)}
          className="qol-image"
        />
      ))}
    </div>
</div>

        </div>

        )}

        {selectedBox && (
          <div className="qol-overlay">
            <div className="qol-popup">
              <div className="qol-popup-container">
                <h2 className="qol-popup-title">{selectedBox.prompt}</h2>
                <img src={selectedBox.imageData} alt={selectedBox.prompt} className="qol-popup-image" />
                <p className="qol-popup-description">{selectedBox.description}</p>
                <a href="/Statistics" className="qol-statistics-link">More Information Here</a>
                <button onClick={closePopup} className="qol-close-button">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default QOL;