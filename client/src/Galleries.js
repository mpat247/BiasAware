import React, { useState } from 'react';
// import './Galleries.scss';
import './Galleries.css';

const Galleries = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({src: '', alt: ''});

    const images = [1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001].map(i => {
        const size = 200 * [5, 6, 7, 8][Math.floor(Math.random() * 4)];
        return `https://unsplash.it/${size}/${size}?image=${i}`;
    });

    const openModal = (imageSrc) => {
        setSelectedImage({src: imageSrc});
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <div className="gallery">
                {images.map((src, index) => (
                    <article key={index} className="gallery-item" onClick={() => openModal(src)}>
                        <a className="gallery-link">
                            <figure className="gallery-image">
                                <img src={src} alt={`Gallery Image ${index}`} />
                                <figcaption>Photo caption</figcaption>
                            </figure>
                        </a>
                    </article>
                ))}
            </div>
            {modalIsOpen && (
                <div className="modal" onClick={closeModal}>
                    <span className="close">&times;</span>
                    <img className="modal-content" src={selectedImage.src} alt={selectedImage.alt} />
                    <div className="caption">{selectedImage.alt}</div>
                </div>
            )}
        </div>
    );
};

export default Galleries;
