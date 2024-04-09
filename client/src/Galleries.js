import React, { useState } from 'react';
import './Galleries.css';

const Galleries = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001].map(i => {
    const size = 200 * [5, 6, 7, 8][Math.floor(Math.random() * 4)];
    return {
      src: `https://unsplash.it/${size}/${size}?image=${i}`,
      alt: `Gallery image ${i}`,
    };
  });

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="gallery-item" onClick={() => openModal(image)}>
            <div className="gallery-image">
              <img src={image.src} alt={image.alt} />
              <figcaption>Photo caption</figcaption>
            </div>
          </div>
        ))}
      </div>
      {modalIsOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImage.src} alt={selectedImage.alt} />
          <div className="caption"></div>
        </div>
      )}
    </div>
  );
};

export default Galleries;