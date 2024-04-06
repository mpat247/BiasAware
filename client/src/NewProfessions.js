import React from 'react';
import './NewProfessions.css';

const categories = [
  { name: 'Business', color: '#3498db', icon: 'https://via.placeholder.com/50x50/3498db/ffffff?text=Business' },
  { name: 'Healthcare', color: '#2ecc71', icon: 'https://via.placeholder.com/50x50/2ecc71/ffffff?text=Healthcare' },
  { name: 'Maintenance', color: '#e74c3c', icon: 'https://via.placeholder.com/50x50/e74c3c/ffffff?text=Education' },
  { name: 'Education', color: '#f1c40f', icon: 'https://via.placeholder.com/50x50/f1c40f/ffffff?text=Maintenance' },
  { name: 'Technology', color: '#9b59b6', icon: 'https://via.placeholder.com/50x50/9b59b6/ffffff?text=Labour' }
];

function NewProfessions() {
  const radius = 200; // Adjusted for bigger bubbles
  const center = { x: 200, y: 200 }; // Adjusted center based on the new size

  return (
    <div className="categories-container">
      {categories.map((category, index) => {
        const angle = (index / categories.length) * 2 * Math.PI;
        const x = center.x + radius * Math.cos(angle) - 75; // Adjust for the new bubble size
        const y = center.y + radius * Math.sin(angle) - 75; // Adjust for the new bubble size
        return (
          <div
            key={category.name}
            className="category-bubble"
            style={{
              backgroundColor: category.color,
              left: `${x}px`,
              top: `${y}px`,
              backgroundImage: `url(${category.icon})`, // Set the background image
              backgroundSize: '50%', // Adjust size of the icon inside the bubble
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center', // Center the icon
              '--delay': index + 1 // Set delay for the wave animation
            }}
          >
          </div>
        );
      })}
    </div>
  );
}

export default NewProfessions;
