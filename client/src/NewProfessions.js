import React, { useState, useEffect } from 'react';
import './NewProfessions.css';
import './ProfCarousel.css';
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';
import axios from 'axios';
import REACT_APP_API_URL from './config';

const initialCategories = [
  { name: 'Business', color: '#FFD600', images: [] },
  { name: 'Healthcare', color: '#D9822A', images: [] },
  { name: 'Maintenance', color: '#BE5C43', images: [] },
  { name: 'Education', color: '#A33862', images: [] },
  { name: 'Labour', color: '#6A2774', images: [] },
];


const ProfCarousel = ({ images, category, categoryImages }) => {
  console.log(`Prof carousel images: ${images}`)
  const [selected, setSelected] = useState(0);
    // Use URLs for your desired images here; I'm keeping placeholders for demonstration:
    // const images = [
    //     basketball,
    //     cricket,
    //     volleyball,
    //     hockey,
    //     bingo, 
    //     tennis
    // ];

    // This effect sets up an interval to change the slide every 3 seconds (3000ms)
    useEffect(() => {
      const interval = setInterval(() => {
        if (images.length > 0) { // Ensure there are images before attempting to change the selected index
          setSelected(prevSelected => (prevSelected + 1) % images.length);
        }
      }, 3000);
  
      return () => clearInterval(interval);
    }, [images.length]); // Only re-run the effect if images.length changes

    const moveToSelected = (element) => {
        if (element === "next") {
            setSelected((prevSelected) => (prevSelected + 1) % images.length);
        } else if (element === "prev") {
            setSelected((prevSelected) => (prevSelected - 1 + images.length) % images.length);
        } else {
            setSelected(element);
        }
    };

    const getClassNames = (index) => {
        let className = '';
        if (index === selected) {
            className = 'selected';
        } else if (index === (selected + 1) % images.length) {
            className = 'next';
        } else if (index === (selected + 2) % images.length) {
            className = 'nextSecond';
        } else if (index === (selected - 1 + images.length) % images.length) {
            className = 'prev';
        } else if (index === (selected - 2 + images.length) % images.length) {
            className = 'prevSecond';
        } else if (index < selected) {
            className = 'hideLeft';
        } else {
            className = 'hideRight';
        }
        return className;
    };


    const arrowStyle = {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
    };

        // Inside your return function before the main tag
    const arrowLeftStyle = {
        ...arrowStyle,
        left: '0%', // Use a percentage value or `vw` units here
    };

    const arrowRightStyle = {
        ...arrowStyle,
        right: '0%', // Use a percentage value or `vw` units here
    };

    return (
      <main>
        <div id="carousel">
          {images.map((image, index) => (
            <a key={index} className={getClassNames(index)} onClick={() => setSelected(index)} href="#!">
              <div className="slideContainer">
                {index === selected && (
                  <div className="captionBanner">{image.prompt}</div> // Use image.prompt here
                )}
                <img src={image.src} alt={image.prompt} />
              </div>
            </a>
            ))}

                <div className="arrows">
                <span id="prev" style={arrowLeftStyle} onClick={() => moveToSelected('prev')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span id="next" style={arrowRightStyle} onClick={() => moveToSelected('next')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
            </div>
            
        </main>
    );
};


// Popup component
const Popup = ({ onClose, bgColor, category, images, categoryImages }) => {
  console.log('Popup: '+ category.images[0].description)
  return (
    <div className="professions-popup-overlay" onClick={onClose}>
         <div className="professions-popup-content" onClick={e => e.stopPropagation()}>
            <div className="professions-popup-header">
                <h1 className="professions-popup-title" style={{ color: bgColor }}>{category.name}</h1>
            </div>
            <div className="professions-popup-body">
                <div className="professions-popup-slides-container">
                    <div className="professions-popup-slide" style={{ backgroundColor: bgColor }}>
                       {/* ProfCarousel component will go here */}
                        <ProfCarousel images={category.images} category={category} categoryImages={categoryImages}/>
                    </div>
                    
                </div>
                <div className="professions-popup-slide-caption">
                    {/* <p className="professions-popup-statistical-analysis" style={{ color: bgColor }}>The statistical analysis caption is going to go here.</p> */}
                    <p className="professions-popup-statistical-analysis">{category.images[0].description}</p>
                </div>
                </div>
            <div className="professions-popup-footer">
            <button className="professions-popup-button-text" onClick={onClose} style={{ backgroundColor: bgColor }}>Close</button>
            </div>
        </div>
    </div>
);
};

// ProfessionsLanding component
const NewProfessions = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayTitle, setDisplayTitle] = useState('');
  const [categories, setCategories] = useState(initialCategories);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [selectedImageDb, setSelectedImageDb] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    axios.get(`${REACT_APP_API_URL}/professions`)
      .then(response => {
        const fetchedImages = response.data.images;
        // Create a new categories array with updated images
        const updatedCategories = initialCategories.map(category => ({
          ...category,
          images: fetchedImages
            .filter(image => image.profession_type === category.name)
           .map(image => ({
              src: image.image, // Assuming 'image' contains the full image URL or data URL
              prompt: image.prompt, // Text prompt for the image
              description: image.description // Description of the image, if available
            })) // Assuming 'image' contains the full image URL
        }));
        setCategories(updatedCategories);
      })
      .catch(err => {
        setError('Failed to fetch images: ' + err.message);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    const srcList = category.images.map(image => image.src);
    setDisplayImages(srcList);

    setSelectedCategory(category);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="professions-landing-page-container">
      <div className="professions-landing-page-title">
        <h1 className="professions-landing-page-header">PROFESSIONS</h1>
      </div>
      <div className="professions-category">
        {categories.map((category, index) => (
          <div key={index} className="professions-category-item" onClick={() => handleCategoryClick(category)} style={{ backgroundColor: category.color }}>
                      {console.log(category)}

            <span className="professions-category-item-title">{category.name}</span>
          </div>
        ))}
      </div>
      {isPopupVisible && selectedCategory && (
        <Popup
          onClose={handleClosePopup}
          bgColor={selectedCategory.color}
          category={selectedCategory}
          images={displayImages} // Pass the images to the Popup
          categoryImages={selectedCategory.Images}
        />
      )}
      
    </div>
  );
};

export default NewProfessions;