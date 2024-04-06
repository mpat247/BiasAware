import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfCarousel.css';
import REACT_APP_API_URL from './config';

const ProfCarousel = ({ selectedProfession }) => {
    const [selected, setSelected] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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



    useEffect(() => {
        setLoading(true);
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${REACT_APP_API_URL}/professions`);
                const filteredSlides = response.data.images
                    .filter(image => image.profession_type === selectedProfession)
                    .map(image => ({
                        src: image.image,
                        title: image.prompt,
                    }));
                setSlides(filteredSlides);
            } catch (err) {
                setError('Failed to fetch images: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [selectedProfession]);

    const newSlideImages = slideImages.slice(0, slides.length);


    const moveToSelected = (index) => {
        setSelected(index);
    };

    const getClassNames = (index) => {
        return index === selected ? 'slide selected' : 'slide';
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main>
            <div className="titleBar">
                <h1>{selectedProfession}</h1>
            </div>
            {/* <div id="carousel">
                {slides.map((slide, index) => (

                    <div key={index} className={getClassNames(index)}>
                        <img src={slide.src} alt={`Slide ${index}`} className="carousel-image" />
                        <div className="slideTextContent">
                            <h1>{slide.title}</h1>
                        </div>
                    </div>
                ))}
            </div> */}

            <div id="carousel">
                {slides.map((slide, index) => (
                    <a key={index} className={getClassNames(index)} onClick={() => moveToSelected(index)} href="#/">
                        <div className="slideContainer">
                            <div className="slideImage" style={{ backgroundImage: `url(${slide.src})` }}></div>
                            {/* Removed the img tag since the background image is now set in the slideImage div */}
                            <div className="slideTextContent">
                                <div className='text1'>{slide.title}</div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>


            
            <div className="buttons">
                <button
                    id="prev"
                    className="arrow left"
                    onClick={() => moveToSelected((selected - 1 + slides.length) % slides.length)}
                >
                    &lt;
                </button>
                <button
                    id="next"
                    className="arrow right"
                    onClick={() => moveToSelected((selected + 1) % slides.length)}
                >
                    &gt;
                </button>
            </div>
        </main>
    );
};

export default ProfCarousel;