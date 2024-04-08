import React from 'react';
import './NewProfessions.css';

const categories = [
  { name: 'Business', color: '#FFD600' },
  { name: 'Healthcare', color: '#D9822A' },
  { name: 'Maintenance', color: '#BE5C43' },
  { name: 'Education', color: '#A33862' },
  { name: 'Technology', color: '#6A2774' }
];

const ProfessionsLanding = () => {
  return (
    <div className="professions-landing-page-container">
      <div className="professions-landing-page-title">
        <h1 className="professions-landing-page-header">PROFESSIONS</h1>
      </div>
      <div className="category">
        {categories.map((category, index) => (
          <a key={index} href="#" className="category-item" style={{ backgroundColor: category.color }}>
            <span className="category-item-title">{category.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfessionsLanding;
