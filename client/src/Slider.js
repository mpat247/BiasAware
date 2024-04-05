import React, { useRef, useState } from 'react';
import './Slider.css';

const Slider = () => {
    const slides = ['blue', 'yellow', 'red', 'green'];
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderEl = useRef(null);

    const onPrevArrowClick = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
        updateSliderPosition();
    };

    const onNextArrowClick = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
        updateSliderPosition();
    };

    const updateSliderPosition = () => {
        const cardWidth = parseInt(getComputedStyle(sliderEl.current).getPropertyValue('--card-width'), 10);
        sliderEl.current.style.setProperty('--active-index', activeIndex);
        sliderEl.current.style.left = `calc(-1 * ${cardWidth}px * var(--active-index))`;
    };

    return (
        <div className="crime-container">
            <div className="crime-slider" ref={sliderEl}>
                <div className="crime-slider__cards">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`crime-slider__card crime-slider__card--${slide}${activeIndex === index ? ' active' : ''}`}
                        ></div>
                    ))}
                </div>
                <div className="crime-slider__arrows">
                    <button className="crime-slider__arrow crime-slider__arrow--prev" onClick={onPrevArrowClick}></button>
                    <button className="crime-slider__arrow crime-slider__arrow--next" onClick={onNextArrowClick}></button>
                </div>
                <div className="crime-slider__bullets">
                    {slides.map((slide, index) => (
                        <button
                            key={index}
                            className={`crime-slider__bullet${activeIndex === index ? ' active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Slider;
