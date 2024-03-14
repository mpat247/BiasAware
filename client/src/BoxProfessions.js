import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BoxProfessions.css';

const BoxProfessions = () => {
    const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide
    const sliderRef = useRef(null);
    const totalBoxes = 4; // Adjust this if the number of unique boxes changes

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        beforeChange: (current, next) => setCurrentSlide(next) // Update currentSlide state on slide change
    };

    const handleBoxClick = boxIndex => {
        if (sliderRef.current) {
            // Calculate the new index based on the clicked box and the current slide
            const offset = currentSlide % totalBoxes; // Offset from the start of the repeating pattern
            const cycles = Math.floor(currentSlide / totalBoxes); // How many full cycles have been completed
            const targetIndexInCycle = boxIndex + (boxIndex < offset ? totalBoxes : 0); // Correct target index within a cycle
            const newSlideIndex = cycles * totalBoxes + targetIndexInCycle; // Calculate the actual slide index
            sliderRef.current.slickGoTo(newSlideIndex);
        }
    };

    return (
        <div className="box-container">
            <div className="box-content">
                <div className="left-box"></div>
                <div className="middle-box"></div>
                <div className="underlay-right-boxes-container">
                    <Slider ref={sliderRef} {...settings}>
                        <div className="box" onClick={() => handleBoxClick(0)}>Box 1</div>
                        <div className="box" onClick={() => handleBoxClick(1)}>Box 2</div>
                        <div className="box" onClick={() => handleBoxClick(2)}>Box 3</div>
                        <div className="box" onClick={() => handleBoxClick(3)}>Box 4</div>
                        {/* Repeat boxes for the demonstration; in actual use, Slider manages repetition */}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BoxProfessions;
