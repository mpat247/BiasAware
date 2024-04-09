import React, { useState } from 'react';
import './NewProfessions.css';

// Define the categories and their colors
const categories = [
  { name: 'Business', color: '#FFD600' },
  { name: 'Healthcare', color: '#D9822A' },
  { name: 'Maintenance', color: '#BE5C43' },
  { name: 'Education', color: '#A33862' },
  { name: 'Technology', color: '#6A2774' }
];

// Popup component
const Popup = ({ onClose, bgColor, categoryName }) => {
  return (
    <div className="professions-popup-overlay" onClick={onClose}>
         <div className="professions-popup-content" onClick={e => e.stopPropagation()}>
            <div className="professions-popup-header">
                <h1 className="professions-popup-title" style={{ color: bgColor }}>{categoryName}</h1>
            </div>
            <div className="professions-popup-body">
                <div className="professions-popup-slides-container">
                    <div className="professions-popup-slide" style={{ backgroundColor: bgColor }}>
                        {/* <img src={basketball} alt="basketball" className="professions-popup-image"/> */}
                    </div>
                    
                </div>
                <div className="professions-popup-slide-caption">
                    {/* <p className="professions-popup-statistical-analysis" style={{ color: bgColor }}>The statistical analysis caption is going to go here.</p> */}
                    <p className="professions-popup-statistical-analysis">The statistical analysis caption is going to go here.</p>
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
const ProfessionsLanding = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="professions-landing-page-container">
      <div className="professions-landing-page-title">
        <h1 className="professions-landing-page-header">PROFESSIONS</h1>
      </div>
      <div className="category">
        {categories.map((category, index) => (
          <div key={index} className="category-item" onClick={() => handleCategoryClick(category)} style={{ backgroundColor: category.color }}>
            <span className="category-item-title">{category.name}</span>
          </div>
        ))}
      </div>
      {isPopupVisible && selectedCategory && (
        <Popup
          onClose={handleClosePopup}
          bgColor={selectedCategory.color}
          categoryName={selectedCategory.name}
        />
      )}
    </div>
  );
};

export default ProfessionsLanding;
