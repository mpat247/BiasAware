import React, { useState } from 'react';
import './ProfCarousel.css';

const ProfCarousel = () => {
    const [selected, setSelected] = useState(0);
    // Use URLs for your desired images here; I'm keeping placeholders for demonstration:
    const slides = [
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

    const moveToSelected = (element) => {
        if (element === "next") {
            setSelected((prevSelected) => (prevSelected + 1) % slides.length);
        } else if (element === "prev") {
            setSelected((prevSelected) => (prevSelected - 1 + slides.length) % slides.length);
        } else {
            setSelected(element);
        }
    };

    const getClassNames = (index) => {
        let className = '';
        if (index === selected) {
            className = 'selected';
        } else if (index === (selected + 1) % slides.length) {
            className = 'next';
        } else if (index === (selected + 2) % slides.length) {
            className = 'nextSecond';
        } else if (index === (selected - 1 + slides.length) % slides.length) {
            className = 'prev';
        } else if (index === (selected - 2 + slides.length) % slides.length) {
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
                {slides.map((src, index) => (
                    <a key={index} className={getClassNames(index)} onClick={() => moveToSelected(index)} href="javascript:void(0);">
                        <img src={src} alt={`Slide ${index + 1}`} />
                    </a>
                ))}
            </div>
            <div className="buttons">
                <button id="prev" className="arrow left" onClick={() => moveToSelected('prev')}>
                    {/* Insert Left Arrow SVG Here */}
                </button>
                <button id="next" className="arrow right" onClick={() => moveToSelected('next')}>
                    {/* Insert Right Arrow SVG Here */}
                </button>
            </div>
        </main>
    );
};

export default ProfCarousel;
