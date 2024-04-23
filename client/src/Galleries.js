import React, { useState } from 'react';
import './Galleries.css';
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';

const Galleries = ({ images }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Array of image objects
    const galleryImages = [
      { src: basketball, alt: "Basketball" },
      { src: cricket, alt: "Cricket" },
      { src: volleyball, alt: "Volleyball" },
      { src: hockey, alt: "Hockey" },
      { src: bingo, alt: "Bingo" },
      { src: tennis, alt: "Tennis" },
      { src: basketball, alt: "Basketball" },
      { src: cricket, alt: "Cricket" },
      { src: volleyball, alt: "Volleyball" },
      { src: hockey, alt: "Hockey" },
      { src: bingo, alt: "Bingo" },
      { src: tennis, alt: "Tennis" },
      { src: basketball, alt: "Basketball" },
      { src: cricket, alt: "Cricket" },
      { src: volleyball, alt: "Volleyball" },
      { src: hockey, alt: "Hockey" },
      { src: bingo, alt: "Bingo" },
      { src: tennis, alt: "Tennis" },
      { src: basketball, alt: "Basketball" },
      { src: cricket, alt: "Cricket" },
      { src: volleyball, alt: "Volleyball" },
      { src: hockey, alt: "Hockey" },
      { src: bingo, alt: "Bingo" },
      { src: tennis, alt: "Tennis" },
      { src: basketball, alt: "Basketball" },
      { src: cricket, alt: "Cricket" },
      { src: volleyball, alt: "Volleyball" },
      { src: hockey, alt: "Hockey" },
      { src: bingo, alt: "Bingo" },
      { src: tennis, alt: "Tennis" },
    ];

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="galleries-gallery-container">
            <div className="galleries-gallery">
                {galleryImages.map((image, index) => (
                    <div key={index} className="galleries-gallery-item" onClick={() => openModal(image)}>
                        <div className="galleries-gallery-image">
                            <img src={image.src} alt={image.alt} />
                            <figcaption>Photo caption</figcaption>
                        </div>
                    </div>
                ))}
            </div>
            {modalIsOpen && (
                <div className="galleries-modal" onClick={closeModal}>
                    <span className="galleries-close">&times;</span>
                    <img className="galleries-modal-content" src={selectedImage.src} alt={selectedImage.alt} />
                    <div className="galleries-caption"></div>
                </div>
            )}
        </div>
    );
};

export default Galleries;