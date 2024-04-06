import React from 'react';
import './NewProfessions.css';

const categories = [
  { name: 'Business', color: '#3498db' },
  { name: 'Healthcare', color: '#2ecc71' },
  { name: 'Maintenance', color: '#e74c3c' },
  { name: 'Education', color: '#f1c40f' },
  { name: 'Technology', color: '#9b59b6' }
];

function NewProfessions() {
  const radius = 150; // Radius of the circle on which bubbles are placed
  const center = { x: 150, y: 150 }; // Center of the circle

  return (
    <div className="categories-container">
      {categories.map((category, index) => {
        const angle = (index / categories.length) * 2 * Math.PI; // Angle in radians for each bubble
        const x = center.x + radius * Math.cos(angle) - 50; // Adjust 50 to half the width of the bubble for centering
        const y = center.y + radius * Math.sin(angle) - 50; // Adjust 50 to half the height of the bubble for centering
        return (
          <div
            key={category.name}
            className="category-bubble"
            style={{
              backgroundColor: category.color,
              left: `${x}px`,
              top: `${y}px`
            }}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
}

export default NewProfessions;
