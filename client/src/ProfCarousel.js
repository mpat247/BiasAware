import React, { useState } from 'react';
import './ProfCarousel.css';

const ProfCarousel = () => {
    const [selected, setSelected] = useState(0);
    const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Assuming you have 10 slides as per your HTML

    const moveToSelected = (element) => {
        if (element === "next") {
            setSelected((prevSelected) => (prevSelected + 1) % slides.length);
        } else if (element === "prev") {
            setSelected((prevSelected) => (prevSelected - 1 + slides.length) % slides.length);
        } else {
            setSelected(element);
        }
    };

    // Calculating classes for carousel slides
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
            {/* <h1>Carousel</h1> */}
            {/* <div className="gradientBRD"></div> */}
            <div id="carousel">
                {slides.map((num, index) => (
                    <a key={index} className={getClassNames(index)} onClick={() => moveToSelected(index)} href="javascript:void(0);">
                        <img src={`https://via.placeholder.com/800x600/f06/fff/?text=${num}`} alt={`Slide ${num}`} />
                    </a>
                ))}
            </div>
            {/* <div className="gradientBRD"></div> */}
            <div className="buttons">
                <button id="prev" className="arrow left" onClick={() => moveToSelected('prev')}>
                    {/* SVG for left arrow */}
                </button>
                <button id="next" className="arrow right" onClick={() => moveToSelected('next')}>
                    {/* SVG for right arrow */}
                </button>
            </div>
        </main>
    );
};

export default ProfCarousel;
