import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Addictions.css';
import ArrowLeftImage from "./Arrows/Arrow_Left_1.png";
import ArrowRightImage from "./Arrows/Arrow_Right_1.png";
import axios from 'axios';
import REACT_APP_API_URL from './config.js';

// ImagePreloader component with logging
const ImagePreloader = ({ src, alt, fallback = 'path/to/your/loading-spinner.gif', ...props }) => {
    console.log(`Preloading image: ${src}`);

    const [loadedSrc, setLoadedSrc] = useState(fallback);

    useEffect(() => {
        console.log(`Begin loading image: ${src}`);
        const img = new Image();
        img.onload = () => {
            console.log(`Finished loading image: ${src}`);
            setLoadedSrc(src);
        };
        img.src = src;
    }, [src]);

    return <img src={loadedSrc} alt={alt} {...props} />;
};

const PopupCard = ({ image, prompt, sideImages, onClose, description }) => {
    console.log(`Rendering PopupCard for prompt: ${prompt}`);

    return (
        <div className="popup-card">
            <div className="popup-content">
                <button className="close-button" onClick={() => {
                    console.log("Closing popup");
                    onClose();
                }}>Close</button>
                <div className="popup-prompt">{prompt} Dependent Individual</div>
                <div className="popup-description">{description}</div>
                {sideImages.map((src, index) => (
                    <ImagePreloader key={index} src={src} alt={`Side Image ${index}`} />
                ))}
                <ImagePreloader src={image} alt="Main Image" className="popup-main-image" />
            </div>
        </div>
    );
};

const Addictions = () => {
    console.log("Addictions component rendering");

    const [imagesData, setImagesData] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [popupPrompt, setPopupPrompt] = useState('');
    const [popUpMain, setPopUpMain] = useState([]);
    const [sideImagesData, setSideImagesData] = useState([]);
    const [popUpSide, setPopUpSide] = useState([]);
    const [popupDescription, setpopupDescription] = useState('');

    const API = REACT_APP_API_URL;

    useEffect(() => {
        console.log("Fetching images from API");
        const fetchImages = async () => {
            try {
                console.log(`Fetching main images from ${API}/addictions/main-images`);
                const mainResponse = await axios.get(`${API}/addictions/main-images`);
                console.log("Main images response", mainResponse.data.images);

                console.log(`Fetching side images from ${API}/addictions/side-images`);
                const sideResponse = await axios.get(`${API}/addictions/side-images`);
                console.log("Side images response", sideResponse.data.images);

                setImagesData(mainResponse.data.images);
                setSideImagesData(sideResponse.data.images);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch images:', error);
            }
        };

        fetchImages();
    }, []);

    const nextImage = () => {
        console.log("Next image button clicked");
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    };

    const previousImage = () => {
        console.log("Previous image button clicked");
        setCurrentImageIndex((prevIndex) => prevIndex === 0 ? imagesData.length - 1 : prevIndex - 1);
    };

    const openPopup = (prompt, description) => {
        console.log(`Opening popup for prompt: ${prompt}`);
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
        setPopupPrompt(prompt);
        setpopupDescription(description);

        const mainImage = imagesData.find(image => image.prompt === prompt)?.image;
        console.log(`Main image for popup: ${mainImage}`);
        setPopUpMain([mainImage]);

        const sideImages = sideImagesData.filter(image => image.prompt === prompt).map(image => image.image);
        console.log(`Side images for popup:`, sideImages);
        setPopUpSide(sideImages);
    };

    const closePopup = () => {
        console.log("Closing popup");
        setShowPopup(false);
        document.body.style.overflow = 'auto';
    };

    const getCurrentImages = () => {
        console.log("Getting current images for display");
        return [
            imagesData[(currentImageIndex + imagesData.length - 2) % imagesData.length],
            imagesData[(currentImageIndex + imagesData.length - 1) % imagesData.length],
            imagesData[currentImageIndex],
            imagesData[(currentImageIndex + 1) % imagesData.length],
            imagesData[(currentImageIndex + 2) % imagesData.length]
        ];
    };

    return (
        <div id="addictions" className="Addictions">
            <header className="App-header">
                <NavigationBar />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="addictions-container">
                        <h1>A D D I C T I O N S</h1>
                        <div style={{ display: 'flex' }}>
                            {getCurrentImages().map((image, index) => {
                                console.log(`Rendering image component for image: ${image.image}`);
                                return (
                                    <div className="image-component" key={index}>
                                        <ImagePreloader src={image.image} alt={`Addictions Illustration ${index}`} onClick={() => openPopup(image.prompt, image.description)} />
                                    </div>
                                );
                            })}
                        </div>
                        <button className="arrow-button arrow-button-left" onClick={previousImage}>
                            <img src={ArrowLeftImage} alt="Left Arrow" />
                        </button>
                        <button className="arrow-button arrow-button-right" onClick={nextImage}>
                            <img src={ArrowRightImage} alt="Right Arrow" />
                        </button>
                    </div>
                )}
            </header>
            {showPopup && (
                <>
                    <div className="overlay" onClick={closePopup}></div>
                    <PopupCard
                        image={popUpMain[0]}
                        prompt={popupPrompt}
                        sideImages={popUpSide}
                        onClose={closePopup}
                        description={popupDescription}
                    />
                </>
            )}
        </div>
    );
};

export default Addictions;
