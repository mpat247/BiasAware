import React, { useState } from 'react';
import './ProfCarousel.css';

const ProfCarousel = () => {
    const [selected, setSelected] = useState(0);
    // Use URLs for your desired images here; I'm keeping placeholders for demonstration:
    const slideImages = [
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Blue
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Green
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Red
        'https://via.placeholder.com/800x600/0B0533/000000/?text=', // Yellow
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Magenta
        'https://via.placeholder.com/800x600/0B0533/000000/?text=', // Cyan
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Orange
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Brown
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text=', // Purple
        'https://via.placeholder.com/800x600/0B0533/ffffff/?text='  // Gray
    ];

    // URLs for the images you want to use as the background for each slide
    const slideBackgroundImages = [
        'url("https://via.placeholder.com/800x600/FFFF00/000000/?text=Slide1")', // Yellow
        'url("https://via.placeholder.com/800x600/FF00FF/000000/?text=Slide2")', // Purple
        'url("https://via.placeholder.com/800x600/00FFFF/000000/?text=Slide3")', // Cyan
        'url("https://via.placeholder.com/800x600/FF0000/000000/?text=Slide4")', // Red
        'url("https://via.placeholder.com/800x600/00FF00/000000/?text=Slide5")', // Green
        'url("https://via.placeholder.com/800x600/0000FF/000000/?text=Slide6")', // Blue
        'url("https://via.placeholder.com/800x600/FFFF00/000000/?text=Slide7")', // Yellow
        'url("https://via.placeholder.com/800x600/FF00FF/000000/?text=Slide8")', // Purple
        'url("https://via.placeholder.com/800x600/00FFFF/000000/?text=Slide9")', // Cyan
        'url("https://via.placeholder.com/800x600/FF0000/000000/?text=Slide10")' // Red
    ];

    const moveToSelected = (element) => {
        if (element === "next") {
            setSelected((prevSelected) => (prevSelected + 1) % slideImages.length);
        } else if (element === "prev") {
            setSelected((prevSelected) => (prevSelected - 1 + slideImages.length) % slideImages.length);
        } else {
            setSelected(element);
        }
    };

    const getClassNames = (index) => {
        let className = '';
        if (index === selected) {
            className = 'selected';
        } else if (index === (selected + 1) % slideImages.length) {
            className = 'next';
        } else if (index === (selected + 2) % slideImages.length) {
            className = 'nextSecond';
        } else if (index === (selected - 1 + slideImages.length) % slideImages.length) {
            className = 'prev';
        } else if (index === (selected - 2 + slideImages.length) % slideImages.length) {
            className = 'prevSecond';
        } else if (index < selected) {
            className = 'hideLeft';
        } else {
            className = 'hideRight';
        }
        return className;
    };

    return (
        <main>
            <div id="carousel">
                {slideImages.map((src, index) => (
                    <a key={index} className={getClassNames(index)} onClick={() => moveToSelected(index)} href="javascript:void(0);">
                        <div className="slideContainer">
                            <div className="slideImage" style={{ backgroundImage: slideBackgroundImages[index] }}></div>
                            <img src={src} alt={`Slide ${index + 1}`} />
                        </div>
                    </a>
                ))}
            </div>
            <div className="buttons">
                <button id="prev" className="arrow left" onClick={() => moveToSelected('prev')}>
                    &lt;
                </button>
                <button id="next" className="arrow right" onClick={() => moveToSelected('next')}>
                    &gt;
                </button>
            </div>
        </main>
    );
};

export default ProfCarousel;
