import React, { useEffect, useState } from 'react';
import './NewActivities.css';
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';
import axios from 'axios';
import REACT_APP_API_URL from './config.js';
import GearLoader from './GearLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const colors = ["#FFD600", "#F5A720", "#D9822A", "#BE5C43", "#A33862", "#6A2774", "#441A93", "#161E7B"]; // Define colors for slides

// Define slide information, mapping each image to a color
const initialSlideInfo = [
    { image: null, color: colors[0], name: "Badminton", prompt: "A Badminton Player" },
    { image: null, color: colors[1], name: "Basketball", prompt: "A Basketball Player" },
    { image: null, color: colors[2], name: "Bingo",prompt: "A Bingo Player" },
    { image: null, color: colors[3], name: "Cricket" ,prompt: "A Cricket Player"},
    { image: null, color: colors[4], name: "Cycling", prompt: "A Cyclist" },
    { image: null, color: colors[5], name: "Marathon", prompt: "A Marathon Runner" },
    { image: null, color: colors[6], name: "Meditating", prompt: "A Meditator" },
    { image: null, color: colors[7], name: "Paint", prompt: "A Painter" },
    { image: null, color: colors[0], name: "Rowing", prompt: "A Rower" },
    { image: null, color: colors[1], name: "Skating", prompt: "A Skater" },
    { image: null, color: colors[2], name: "Tennis", prompt: "A Tennis Player" },
    { image: null, color: colors[3], name: "Travel", prompt: "A Traveler" },
    { image: null, color: colors[4], name: "VideoGame", prompt: "A Video Gamer" },
    { image: null, color: colors[5], name: "Volleyball", prompt: "A Volleyball Player" },
    { image: null, color: colors[6], name: "Weightlifting", prompt: "A Weightlifter" },
    { image: null, color: colors[6], name: "Yoga", prompt: "A Yogi" },

];


const Popup = ({ isVisible, onClose, bgColor, description, name, sideImages, selectedImage, prompt, sideLoader }) => {

    useEffect(() => {
        console.log("Popup bgColor prop:", bgColor);
    }, [bgColor]); // Only re-run the effect if bgColor changes

    console.log("Popup side image :", + sideImages);   

    if (!isVisible) return null;
    // console.log("Popup color:", bgColor);

    return (
        <div className="activities-popup-overlay" onClick={onClose}>
            <div className="activities-popup-content" onClick={e => e.stopPropagation()} style={{ position: 'relative' }}>
                <button
                    style={{
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        padding: '3px 8px',
                        backgroundColor: bgColor,
                        color: 'rgba(255, 255, 255, 0.55)',
                        border: '1px solid rgba(255, 255, 255, 0.55)',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        zIndex: 1000,
                        pointerEvents: 'auto'
                    }}
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {sideLoader ? (
                    <GearLoader /> // Display the loader while loading
                ) : (
                    <>
                        <div className="activities-popup-header" style={{ backgroundColor: bgColor }}>
                            <h1 className="activities-popup-title">{prompt}</h1>
                        </div>
                        <div className="activities-popup-body" style={{ backgroundColor: bgColor }}>
                            <div className="activities-popup-slides-container">
                                {sideImages.map((img, index) => (
                                    <div key={index} className="activities-popup-slide">
                                        <img src={img.image} alt={`Side image ${index + 1}`} className="activities-popup-image" />
                                    </div>
                                ))}
                            </div>
                            <div className="activities-popup-slide-caption">
                                <p className="activities-popup-statistical-analysis">{description}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

const NewActivities = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupColor, setPopupColor] = useState(colors[0]); // Default color
    const [slideInfo, setSlideInfo] = useState(initialSlideInfo); // Use slideInfo as a state
    const [sideImages, setSideImages] = useState([]); // Add a state for side images
    const [hoveredSlide, setHoveredSlide] = useState(null);
    const [selectedSideImages, setSelectedSideImages] = useState([]);
    const [fetchedSideImages, setFetchedSideImages] = useState([]); // State variable for fetched side images
    const [selectedImageDescription, setSelectedImageDescription] = useState(''); // State variable for selected image description
    const [selectedImageName, setSelectedImageName] = useState(''); // State variable for selected image name
    const [selectedImage, setSelectedImage] = useState(''); // State variable for selected image name
    const [selectedImagePrompt, setSelectedImagePrompt] = useState(''); // State variable for selected image name
    const [sideLoader, setSideLoader] = useState(false);
    const [mainLoader, setMainLoader] = useState(true);
    const [key, setKey] = useState(0); // state to hold the key


    useEffect(() => {
        const fetchMainImages = async () => {
            const API_URL = REACT_APP_API_URL;
            console.log(API_URL);
            try {
                const response = await axios.get(`${API_URL}/activities`);
                const sideResponse = await axios.get(`${API_URL}/activities/side`);

                const fetchedImages = response.data.images;
                const fetchedSideImages = sideResponse.data.images;
                console.log(response)
                console.log(fetchedImages)
                console.log(fetchedSideImages)

                const updatedSlideInfo = slideInfo.map(slide => {
                    const foundImage = fetchedImages.find(img => img.prompt.replace(/^Main_/, '') === slide.name);
                    return foundImage ? { ...slide, image: foundImage.image, description: foundImage.description } : slide;
                });


                setSlideInfo(updatedSlideInfo); // Update the state to trigger a re-render
                setFetchedSideImages(fetchedSideImages);
            } catch (error) {
                console.error('Failed to fetch main images:', error);
            } finally {
                setMainLoader(false);
            }
        };

        fetchMainImages();
    }, []);

    const handleSlideClick = async (event, color, name, description, image, prompt2) => {
        // Ensure click was on the intended element
        if (!event.currentTarget.classList.contains('activities-slide-inner')) {
            return; // Exit if click was not on the correct element
        }

        setPopupColor('transparent')

        console.log("printing: ", name, description, prompt2);
        console.log("Details: ", color, name, description, image);

        // Immediately show the popup and activate the loader
        setPopupVisible(true);
        setSideLoader(true); // Set loading to true to show a spinner or loading indicator in the popup

        try {
            const API_URL = REACT_APP_API_URL;
            const sideResponse = await axios.get(`${API_URL}/activities/side?name=${name.substring(0, 3)}`);
            const fetchedSideImages = sideResponse.data.images;

            console.log(fetchedSideImages);

            // Append a specific object to the array of images
            const name2 = name.substring(0, 3);
            let filteredSideImages = fetchedSideImages.filter(image => image.filterer === name2);

            let promptToAdd = fetchedSideImages[0]?.prompt ?? 'Default Prompt';
            let filteredToAdd = fetchedSideImages[0]?.filterer ?? 'Default Filterer';
            let objectToInsert = { image: image, prompt: promptToAdd, filterer: filteredToAdd };

            if (fetchedSideImages.length > 0) {
                fetchedSideImages.splice(1, 0, objectToInsert); // Insert object at the second position
            }

            // Set states for use in the popup
            setSelectedImage(image);
            setSelectedImagePrompt(prompt2);
            setSelectedImageDescription(description);
            setSelectedImageName(name);
            setSelectedSideImages(fetchedSideImages); // Update the state with the modified image list
            console.log("Selected side images: ", filteredSideImages);
        } catch (error) {
            console.error('Failed to fetch side images:', error);
        } finally {
            // Turn off the loader whether the fetch succeeded or failed
            setSideLoader(false);
        }

        setPopupColor(color);
        console.log('Setting color to:', color);

        // Stop further propagation of the click event
        // event.stopPropagation();
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

                this.initSlider();
                this.autoplayDelay = 8000;
                this.startAutoplay();
                this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
                this.container.addEventListener('mouseleave', () => this.startAutoplay());
                this.bindButtons();
            }

            initSlider() {
                this.slider = this.container.querySelector('.activities-slider');
                this.sLiderWidth = this.slider.clientWidth;
                this.oneSLideWidth = this.container.querySelector('.activities-slide:nth-child(2)').clientWidth;
                console.log(this.oneSLideWidth);
                this.sildesPerPage = Math.trunc(this.sLiderWidth / this.oneSLideWidth);
                this.slideMargin = ((this.sLiderWidth - (this.sildesPerPage * this.oneSLideWidth)) / (this.sildesPerPage * 2)).toFixed(5);
                this.changeSlidesMargins();
                this.makeSliderScrollable();
                this.bindButtons();
            }

            bindButtons() {
                this.prevBtn = this.container.querySelector('.activities-handles .activities-prev');
                this.nextBtn = this.container.querySelector('.activities-handles .activities-next');

                if (this.prevBtn && this.nextBtn) {
                    this.prevBtn.addEventListener('click', (event) => {
                        event.stopPropagation();
                        this.prevSlider();
                    });

                    this.nextBtn.addEventListener('click', (event) => {
                        event.stopPropagation();
                        this.nextSlider();
                    });
                } else {
                    // Retry binding buttons after 100 ms
                    setTimeout(() => this.bindButtons(), 100);
                }
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

                this.slider.addEventListener('mousedown', (event) => this.startDrag(event));
                this.slider.addEventListener('touchstart', (event) => this.startDrag(event));

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

                this.startDrag = (event) => {
                    isDragging = true;
                    startPosition = event.clientX || event.touches[0].clientX;
                    startScrollPosition = this.slider.scrollLeft;

                    document.addEventListener('mousemove', drag);
                    document.addEventListener('touchmove', drag);
                    document.addEventListener('mouseup', endDrag);
                    document.addEventListener('touchend', endDrag);
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
            
            destroy() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                }
                this.container.removeEventListener('mouseenter', this.pauseAutoplay);
                this.container.removeEventListener('mouseleave', this.startAutoplay);
                // Remove other event listeners if there are any
            }

        }
        

       


        const container = document.querySelector('.activities-PostSlide .activities-innerContainer');
        if (container) {
            const slider = new PostSlider(container, 1);
            return () => slider.destroy(); // Assuming a destroy method that cleans up

        }
    }, []);

    

    // Inside NewActivities component, before the return statement
    console.log('Popup bgColor state:', popupColor);


    return (
        // <>
        <div className="activities-page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
        <div className="activities-PostSlide-wrapper">
          <div className="activities-title-container" style={{ width: '100%' }}>
            <h1 className="activities-landing-title" style={{ textAlign: 'center', marginBottom: '20px' }}>ACTIVITIES</h1>
          </div>
          {mainLoader ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <GearLoader />
            </div>
          ) : (

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
                                <div className="activities-slide" style={{ backgroundColor: slide.color }}>
                                    <div className="activities-slide-inner"
                                        onClick={(e) => handleSlideClick(e, slide.color, slide.name, slide.description, slide.image, slide.prompt)}
                                        onMouseEnter={() => setHoveredSlide(slide.name)}
                                        onMouseLeave={() => setHoveredSlide(null)}>
                                        <img src={slide.image} className="activities-image" />
                                        {hoveredSlide === slide.name && (
                                            <div className="activities-hover-caption">{slide.name}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!isPopupVisible && (


<div className="activities-handles" style={{ position: 'relative', height: '50px' /* adjust height as needed */ }}>
<span className="activities-prev" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.0001 19.92L8.48009 13.4C7.71009 12.63 7.71009 11.37 8.48009 10.6L15.0001 4.07999" stroke="rgb(55 65 81/1)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
</span>
<span className="activities-next" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.99991 19.92L15.5199 13.4C16.2899 12.63 16.2899 11.37 15.5199 10.6L8.99991 4.07999" stroke="rgb(55 65 81/1)" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
</span>
</div>


)}

                    </div>
                </div>

 )}

            </div>
            <Popup
                isVisible={isPopupVisible}
                onClose={() => [setPopupVisible(false), setPopupColor(false),setKey(prevKey => prevKey + 1)]}
                bgColor={popupColor} // Here you're using popupColor correctly
                description={selectedImageDescription}
                name={selectedImageName}
                sideImages={selectedSideImages}
                selectedImage={selectedImage}
                prompt={selectedImagePrompt}
                sideLoader={sideLoader}
            />
        </div>
    );
};

export default NewActivities;