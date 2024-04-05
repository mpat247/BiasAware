import React, { useEffect, useState } from 'react';
import './NewActivities.css';
import basketball from './images/image 7.png';

const Popup = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="activities-popup-overlay" onClick={onClose}>
            <div className="activities-popup-content" onClick={e => e.stopPropagation()}>
                <div className="activities-popup-header">
                    <h2>O C C U P A T I O N</h2>
                </div>
                <div className="activities-popup-body">
                    <div className="activities-popup-slides-container">
                        <div className="activities-popup-slide">
                        </div>
                        <div className="activities-popup-slide">
                            {/* Content of the second slide */}
                        </div>
                        <div className="activities-popup-slide">
                            {/* Content of the third slide */}
                        </div>
                    </div>
                    <div className="activities-popup-slide-caption">
                        <p>The statistical analysis caption is going to go here.</p>
                    </div>
                    </div>
                <div className="activities-popup-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

const NewActivities = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        var autoplayIntervalInSeconds = 10;

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

                this.autoplayInterval = null;
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

    const handleSlideClick = () => {
        setPopupVisible(true);
    };

    return (
        <>
            <div className="activities-PostSlide-wrapper">
            <div className="activities-title-container">
                <h1>ACTIVITIES</h1>
            </div>
                <div className="activities-PostSlide" onClick={handleSlideClick}>
                    <div className="activities-innerContainer active">
                        <div className="activities-slider">
                            <div className="activities-slide">
                                <div className="activities-slide-inner">
                                    {/* <img src={basketball} alt="basketball"/> */}
                                </div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
                            <div className="activities-slide">
                                <div className="activities-slide-inner"></div>
                            </div>
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
            <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}/>
        </>
    );
};

export default NewActivities;