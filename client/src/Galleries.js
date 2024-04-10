import React, { useState } from 'react';
import './Galleries.css';

const Galleries = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { images } = props;

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="galleries-gallery-container">
        {/* <h1 className="galleries-gallery-title">GALLERY</h1> */}
      <div className="galleries-gallery">
        {images.map((image, index) => (
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