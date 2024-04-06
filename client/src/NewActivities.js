import React, { useEffect, useState } from 'react';
import './NewActivities.css';
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';

const colors = ["#FFD600", "#F5A720", "#D9822A", "#BE5C43", "#A33862", "#6A2774", "#441A93", "#161E7B"]; // Define colors for slides

// Define slide information, mapping each image to a color
const slideInfo = [
    { image: basketball, color: colors[0], name: "Basketball"},
    { image: cricket, color: colors[1], name: "Cricket"},
    { image: volleyball, color: colors[2], name: "Volleyball"},
    { image: hockey, color: colors[3], name: "Hockey"},
    { image: bingo, color: colors[4], name: "Bingo"},
    { image: tennis, color: colors[5], name: "Tennis"},
    { image: basketball, color: colors[6], name: "Basketball"},
    { image: cricket, color: colors[7], name: "Cricket"},
    { image: volleyball, color: colors[0], name: "Volleyball"},
    { image: hockey, color: colors[1], name: "Hockey"},
    { image: bingo, color: colors[2], name: "Bingo"},
    { image: tennis, color: colors[3], name: "Tennis"},
    { image: basketball, color: colors[4], name: "Basketball"},
    { image: cricket, color: colors[5], name: "Cricket"},
    { image: volleyball, color: colors[6], name: "Volleyball"},
    { image: hockey, color: colors[7], name: "Hockey"},
    //We're going to have 16 slides.
  ];

const Popup = ({ isVisible, onClose, bgColor }) => {

    useEffect(() => {
        console.log("Popup bgColor prop:", bgColor);
    }, [bgColor]); // Only re-run the effect if bgColor changes



    if (!isVisible) return null;
    // console.log("Popup color:", bgColor);

    return (
        <div className="activities-popup-overlay" onClick={onClose}>
             <div className="activities-popup-content" onClick={e => e.stopPropagation()}>
                <div className="activities-popup-header" style={{ backgroundColor: bgColor }}>
                    <h1 className="activities-popup-title">Activity Name</h1>
                </div>
                <div className="activities-popup-body" style={{ backgroundColor: bgColor }}>
                    <div className="activities-popup-slides-container">
                        <div className="activities-popup-slide">
                            <img src={basketball} alt="basketball" className="activities-popup-image"/>
                        </div>
                        <div className="activities-popup-slide">
                            <img src={basketball} alt="basketball" className="activities-popup-image"/>
                        </div>
                        <div className="activities-popup-slide">
                            <img src={basketball} alt="basketball" className="activities-popup-image"/>
                        </div>
                    </div>
                    <div className="activities-popup-slide-caption">
                        <p className="activities-popup-statistical-analysis">The statistical analysis caption is going to go here.</p>
                    </div>
                    </div>
                <div className="activities-popup-footer">
                <button className="activities-popup-button-text" onClick={onClose} style={{ backgroundColor: bgColor }}>Close</button>
                </div>
            </div>
        </div>
    );
};

const NewActivities = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupColor, setPopupColor] = useState(colors[0]); // Default color

    const [hoveredSlide, setHoveredSlide] = useState(null);

    const handleSlideClick = (event, color) => {
        // This check ensures that only clicks directly on `activities-slide-inner`
        // or its descendants can trigger the popup.
        if (!event.currentTarget.classList.contains('activities-slide-inner')) {
            return; // Do nothing if the click is not on the target element.
        }
        
        console.log('Setting color to:', color);
        setPopupColor(color); 
        setPopupVisible(true);
        event.stopPropagation(); // Prevent the event from bubbling further.
    };
    
    
      // This useEffect will log whenever popupColor changes
      useEffect(() => {
        console.log('popupColor state updated to:', popupColor);
      }, [popupColor]);


    useEffect(() => {
        var autoplayIntervalInSeconds = 1;

        class PostSlider {

            constructor(containerElement, autoplayIntervalInSeconds) {
                this.container = containerElement;
                if (!this.container) {
                    throw new Error(`Container not found.`);
                }

                this.slider = this.container.querySelector('.activities-slider');
                this.prevBtn = this.container.querySelector('.activities-handles .activities-prev');
                this.nextBtn = this.container.querySelector('.activities-handles .activities-next');

                this.sLiderWidth = this.slider.clientWidth;
                this.oneSLideWidth = this.container.querySelector('.activities-slide:nth-child(2)').clientWidth;
                console.log(this.oneSLideWidth);
                this.sildesPerPage = Math.trunc(this.sLiderWidth / this.oneSLideWidth);
                // this.sildesPerPage = Math.min(Math.trunc(this.sLiderWidth / this.oneSLideWidth), 3);
                this.slideMargin = ((this.sLiderWidth - (this.sildesPerPage * this.oneSLideWidth)) / (this.sildesPerPage * 2)).toFixed(5);
                this.changeSlidesMargins();

                this.makeSliderScrollable();

                // Inside your PostSlider class constructor or the relevant method where you bind event listeners to the arrows
                this.prevBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.prevSlider();
                });
                
                this.nextBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.nextSlider();
                });

                // this.autoplayInterval = null;
                this.autoplayDelay = autoplayIntervalInSeconds * 1000;

                this.startAutoplay()
                this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
                this.container.addEventListener('mouseleave', () => this.startAutoplay());

                return this;
            }
            changeSlidesMargins() {
                const slides = this.container.querySelectorAll('.activities-slide');
                if (this.oneSLideWidth * 2 > this.sLiderWidth) {
                    this.slideMargin = 1;
                    this.oneSLideWidth = this.oneSLideWidth + (this.sLiderWidth - this.oneSLideWidth - 2);
                    slides.forEach(slide => {
                        slide.style.margin = "0 " + this.slideMargin + "px";
                        slide.style.minWidth = this.oneSLideWidth + "px";
                    });

                } else {
                    slides.forEach(slide => {
                        slide.style.margin = "0 " + this.slideMargin + "px";
                    });
                }
            }

            scrollToPosition(position, smooth = true) {
                console.log('Scrolling to position:', position);
                const currentPosition = this.slider.scrollLeft;
                const newPosition = currentPosition + position;

                this.slider.scrollTo({
                    top: 0,
                    left: newPosition,
                    behavior: smooth ? 'smooth' : 'instant'
                });

                console.log('Current position - New position:', currentPosition - newPosition);

                setTimeout(() => {
                    this.snapToNearestSlide();
                }, 300);
            }

            snapToNearestSlide() {
                const currentPosition = this.slider.scrollLeft;
                const nearestLeftScroll = Math.round(currentPosition / (this.oneSLideWidth + (this.slideMargin * 2))) * (this.oneSLideWidth + (this.slideMargin * 2));
                console.log(nearestLeftScroll);
                this.slider.scrollTo({
                    left: nearestLeftScroll,
                    behavior: 'smooth'
                });
            }

            makeSliderScrollable() {
                let isDragging = false;
                let startPosition;
                let startScrollPosition;

                this.slider.addEventListener('mousedown', (event) => startDrag(event));
                this.slider.addEventListener('touchstart', (event) => startDrag(event));

                const startDrag = (event) => {
                    isDragging = true;
                    startPosition = event.clientX || event.touches[0].clientX;
                    startScrollPosition = this.slider.scrollLeft;

                    document.addEventListener('mousemove', drag);
                    document.addEventListener('touchmove', drag);
                    document.addEventListener('mouseup', endDrag);
                    document.addEventListener('touchend', endDrag);
                };

                const drag = (event) => {
                    if (isDragging) {
                        const currentX = event.clientX || event.touches[0].clientX;
                        const deltaX = currentX - startPosition;
                        this.slider.scrollLeft = startScrollPosition - deltaX;
                    }
                };

                const endDrag = () => {
                    if (isDragging) {
                        isDragging = false;
                        const currentPosition = this.slider.scrollLeft;
                        const nearestLeftScroll = Math.round(currentPosition / (this.oneSLideWidth + (this.slideMargin * 2))) * (this.oneSLideWidth + (this.slideMargin * 2));
                        console.log(nearestLeftScroll);
                        this.slider.scrollTo({
                            left: nearestLeftScroll,
                            behavior: 'smooth'
                        });

                        document.removeEventListener('mousemove', drag);
                        document.removeEventListener('touchmove', drag);
                        document.removeEventListener('mouseup', endDrag);
                        document.removeEventListener('touchend', endDrag);
                    }
                };
            }

            nextSlider() {
                const totalWidth = this.slider.scrollWidth;
                const currentScroll = this.slider.scrollLeft;
                const nextScroll = currentScroll + this.oneSLideWidth + (this.slideMargin * 2);

                if (nextScroll + this.slider.clientWidth > totalWidth) {
                    // If next slide goes beyond the end, scroll to the beginning
                    this.slider.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    this.scrollToPosition(this.oneSLideWidth + (this.slideMargin * 2));
                }
            }

            prevSlider() {
                const currentScroll = this.slider.scrollLeft;
                const prevScroll = currentScroll - (this.oneSLideWidth + (this.slideMargin * 2));

                if (prevScroll < 0) {
                    // If previous slide goes before the beginning, scroll to the end
                    this.slider.scrollTo({
                        left: this.slider.scrollWidth - this.slider.clientWidth,
                        behavior: 'smooth'
                    });
                } else {
                    this.scrollToPosition(-1 * (this.oneSLideWidth + (this.slideMargin * 2)));
                }
            }

            startAutoplay() {
                this.autoplayInterval = setInterval(() => {
                    this.nextSlider();
                }, this.autoplayDelay);
            }

            pauseAutoplay() {
                clearInterval(this.autoplayInterval);
            }
        }

        window.addEventListener('load', function () {
            var container = document.querySelector('.activities-PostSlide .activities-innerContainer');
            new PostSlider(container, 3);
        })
    }, []);

    // Inside NewActivities component, before the return statement
    console.log('Popup bgColor state:', popupColor);


    return (
        // <>
        <div className="activities-page-container">
            <div className="activities-PostSlide-wrapper">
            <div className="activities-title-container">
                <h1 className="activities-landing-title">ACTIVITIES</h1>
            </div>
                <div className="activities-PostSlide" onClick={handleSlideClick}>
                    <div className="activities-innerContainer active">

                        {/* <div className="activities-slider">
                            {slideInfo.map((slide, index) => (
                                <div key={index} className="activities-slide" style={{ backgroundColor: slide.color }}>
                                    <div className="activities-slide-inner" onClick={(e) => handleSlideClick(e, slide.color)}>
                                        <img src={slide.image} alt={`Slide ${index + 1}`} className="activities-image" />
                                    </div>
                                </div>
                            ))}
                        </div> */}

                <div className="activities-slider">
                {slideInfo.map((slide, index) => (
                    <div key={index} className="activities-slide" style={{ backgroundColor: slide.color }}>
                    <div className="activities-slide-inner" onClick={(e) => handleSlideClick(e, slide.color)} onMouseEnter={() => setHoveredSlide(slide.name)} onMouseLeave={() => setHoveredSlide(null)}>
                        <img src={slide.image} alt={slide.name} className="activities-image" />
                        {hoveredSlide === slide.name && (
                        <div className="activities-hover-caption">{slide.name}</div>
                        )}
                    </div>
                    </div>
                ))}
            </div>

                        <div className="activities-handles">
                            <span className="activities-prev">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="M15.0001 19.92L8.48009 13.4C7.71009 12.63 7.71009 11.37 8.48009 10.6L15.0001 4.07999"
                                        stroke="rgb(55 65 81/1)" strokeWidth="3" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </span>
                            <span className="activities-next">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="M8.99991 19.92L15.5199 13.4C16.2899 12.63 16.2899 11.37 15.5199 10.6L8.99991 4.07999"
                                        stroke="rgb(55 65 81/1)" strokeWidth="3" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <Popup 
            isVisible={isPopupVisible} 
            onClose={() => setPopupVisible(false)} 
            bgColor={popupColor} // Here you're using popupColor correctly
            />
        </div>
    );
};

export default NewActivities;
