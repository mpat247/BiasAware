import React, { useEffect, useState } from 'react'; // Correctly import useState here
import './NewActivities.css';

const Popup = ({ isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>O C C U P A T I O N</h2>
                </div>
                {/* <div className="popup-body">
                    <div className="popup-slide">
                    </div>
                    <div className="popup-slide">
                    </div>
                    <div className="popup-slide">
                    </div>
                </div> */}
                <div className="popup-body">
                    <div className="popup-slides-container">
                        <div className="popup-slide">
                            {/* <h1>hi</h1> */}
                        </div>
                        <div className="popup-slide">
                            {/* Content of the second slide */}
                        </div>
                        <div className="popup-slide">
                            {/* Content of the third slide */}
                        </div>
                    </div>
                    <div className="popup-slide-caption">
                        <p>The statistical analysis caption is going to go here.</p>
                    </div>
                    </div>
                <div className="popup-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};



const NewActivities = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        var autoplayIntervalInSeconds = 1;

        class PostSlider {

            constructor(containerElement, autoplayIntervalInSeconds) {
                this.container = containerElement;
                if (!this.container) {
                    throw new Error(`Container not found.`);
                }

                this.slider = this.container.querySelector('.slider');
                this.prevBtn = this.container.querySelector('.handles .prev');
                this.nextBtn = this.container.querySelector('.handles .next');

                this.sLiderWidth = this.slider.clientWidth;
                this.oneSLideWidth = this.container.querySelector('.slide:nth-child(2)').clientWidth;
                console.log(this.oneSLideWidth);
                this.sildesPerPage = Math.trunc(this.sLiderWidth / this.oneSLideWidth);
                // this.sildesPerPage = Math.min(Math.trunc(this.sLiderWidth / this.oneSLideWidth), 3);
                this.slideMargin = ((this.sLiderWidth - (this.sildesPerPage * this.oneSLideWidth)) / (this.sildesPerPage * 2)).toFixed(5);
                this.changeSlidesMargins();

                // Assign this.dots before calling bindDotClickHandlers
                this.dots = this.container.querySelectorAll('.dots span');
                // this.bindDotClickHandlers();

                this.makeSliderScrollable();
                // this.prevBtn.addEventListener('click', () => this.prevSlider());
                // this.nextBtn.addEventListener('click', () => this.nextSlider());

                // Inside your PostSlider class constructor or the relevant method where you bind event listeners to the arrows
                this.prevBtn.addEventListener('click', (event) => {
                    event.stopPropagation(); // Stop the event from propagating to the parent div
                    this.prevSlider();
                });
                this.nextBtn.addEventListener('click', (event) => {
                    event.stopPropagation(); // Stop the event from propagating to the parent div
                    this.nextSlider();
                });


                // this.createDots();
                // this.setActiveDotByScroll();

                this.autoplayInterval = null;
                this.autoplayDelay = autoplayIntervalInSeconds * 1000;

                this.startAutoplay()
                this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
                this.container.addEventListener('mouseleave', () => this.startAutoplay());

                return this;
            }
            changeSlidesMargins() {
                const slides = this.container.querySelectorAll('.slide');
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
            scrollWithDots(pos) {
                this.slider.scrollTo({
                    top: 0,
                    left: pos,
                    behavior: "smooth"
                });
            }

            handleDotClick(index) {
                const position = index * (this.slider.getBoundingClientRect()['width']);
                this.scrollWithDots(position);
            }

            changeActiveDot(i) {
                for (let j = 0; j < this.dots.length; j++) {
                    this.dots[j].classList.remove('active');
                }
                this.dots[i].classList.add('active');
            }


            bindDotClickHandlers() {
                for (let i = 0; i < this.dots.length; i++) {
                    this.dots[i].addEventListener('click', () => {
                        console.log('Dot clicked:', i);
                        this.handleDotClick(i);
                    });
                }
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

            setActiveDotByScroll() {
                this.slider.addEventListener('scroll', () => {
                    const scrollLeft = this.slider.scrollLeft;
                    // Assuming each slide is the same width and fills the slider.
                    const index = Math.floor(scrollLeft / this.oneSlideWidth);
            
                    // Clear all active states.
                    this.dots.forEach(dot => dot.classList.remove('active'));
            
                    // Safely add the active state to the current dot if it exists.
                    if (index < this.dots.length) {
                        this.dots[index].classList.add('active');
                    }
            
                    // Update button visibility based on scroll position.
                    this.prevBtn.style.opacity = scrollLeft > 0 ? '1' : '0';
                    this.nextBtn.style.opacity = (scrollLeft + this.slider.clientWidth) < this.slider.scrollWidth ? '1' : '0';
                });
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

            createDots() {
                const dotCount = Math.floor(this.slider.scrollWidth / this.slider.clientWidth);
                const dotsContainer = this.container.querySelector('.dots');
                dotsContainer.innerHTML = '';

                for (let i = 0; i < dotCount; i++) {
                    const dot = document.createElement('span');
                    dot.addEventListener('click', () => {
                        // this.changeActiveDot(i);
                        this.handleDotClick(i);
                    });

                    if (i === 0) {
                        dot.classList.add('active');
                    }

                    dotsContainer.appendChild(dot);
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
            var container = document.querySelector('.PostSlide .innerContainer');
            new PostSlider(container, 3);
        })
    }, []);

    const handleSlideClick = () => {
        // This function will be called when a slide is clicked
        setPopupVisible(true);
    };

    return (
        <>
            {/* <h1> */}
            <div className="PostSlide-wrapper">
            <div className="title-container">
                <h1>ACTIVITIES</h1>
            </div>
                <div className="PostSlide" onClick={handleSlideClick}>
                    <div className="innerContainer active">
                        <div className="slider">
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                            <div className="slide"></div>
                        </div>

                        <div className="handles">
                            <span className="prev">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="M15.0001 19.92L8.48009 13.4C7.71009 12.63 7.71009 11.37 8.48009 10.6L15.0001 4.07999"
                                        stroke="rgb(55 65 81/1)" strokeWidth="3" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </span>
                            <span className="next">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"><path
                                        d="M8.99991 19.92L15.5199 13.4C16.2899 12.63 16.2899 11.37 15.5199 10.6L8.99991 4.07999"
                                        stroke="rgb(55 65 81/1)" strokeWidth="3" strokeMiterlimit="10"
                                        strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </span>
                        </div>
                        {/* <div className="dots"></div> */}
                    </div>
                </div>
            </div>
            {/* </h1> */}
            <Popup isVisible={isPopupVisible} onClose={() => setPopupVisible(false)}/>
        </>
    );
};

export default NewActivities;