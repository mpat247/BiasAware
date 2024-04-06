import React from 'react';
import './NewProfessions.css'; // Make sure your CSS styles are updated accordingly

const categories = [
  { name: 'Business', color: '#3498db' },
  { name: 'Healthcare', color: '#2ecc71' },
  { name: 'Maintenance', color: '#e74c3c' },
  { name: 'Education', color: '#f1c40f' },
  { name: 'Technology', color: '#9b59b6' }
];

// Integrated CategoryBubble component
const CategoryBubble = ({ category }) => (
  <div className="category-bubble" style={{ backgroundColor: category.color }}>
    {category.name}
  </div>
);

function NewProfessions() {
  return (
    <div className="categories-container">
      {categories.map(category => (
        <CategoryBubble key={category.name} category={category} />
      ))}
    </div>
  );
}

export default NewProfessions;
