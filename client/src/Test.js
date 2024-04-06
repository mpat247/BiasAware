// CarouselComponent.jsx
import React, { useState } from 'react';
import './Test.css';

const Test = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="carousel-container">
            <button className="carousel-button prev" onClick={goToPrevious}>&lt;</button>
            <div className="carousel-images">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="carousel-button next" onClick={goToNext}>&gt;</button>
        </div>
    );
};

export default Test;
