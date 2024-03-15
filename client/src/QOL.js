import React, { useState, useEffect } from 'react';

const QOL = () => {
  const [bottomLeftImages, setBottomLeftImages] = useState([]);
  const [bottomRightImages, setBottomRightImages] = useState([]);
  const [bottomLeftIndex, setBottomLeftIndex] = useState(0);
  const [bottomRightIndex, setBottomRightIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState(null);

  useEffect(() => {
    // Function to fetch images for the bottom-left side
    const fetchBottomLeftImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/qol/main');
        if (!response.ok) {
          throw new Error('Failed to fetch bottom-left images');
        }
        const data = await response.json();
        console.log(data);
    
        // Extract image data and prompt, and construct image URL
        const imagesWithImage = data.images.map(image => ({
          imageData: image.imageData, // Assuming image data is directly available in the imageData field
          prompt: image.prompt
        }));
    
        // Log prompt field for each image
        imagesWithImage.forEach(image => {
          console.log('Prompt:', image.prompt);
        });
    
        // Log image data for debugging
        imagesWithImage.forEach(image => {
          console.log('Image Data:', image.imageData);
        });
    
        // Shuffle the images
        const shuffledImages = shuffleArray(imagesWithImage);
    
        // Set the bottomLeftImages state with the updated data
        setBottomLeftImages(shuffledImages);
      } catch (error) {
        console.error('Failed to fetch bottom-left images:', error);
      }
    };

    // Function to fetch images for the bottom-right side
    const fetchBottomRightImages = async () => {
      try {
        const response = await fetch('http://localhost:3001/qol/main2');
        if (!response.ok) {
          throw new Error('Failed to fetch bottom-right images');
        }
        const data = await response.json();
        console.log('Bottom right images:', data.images); // Log the retrieved images

        // Extract image data and create prompt for each image
        const imagesWithPrompt = data.images.map(image => ({
          imageData: image.imageData,
          prompt: image.prompt
        }));

        // Log prompt for each image
        imagesWithPrompt.forEach(image => {
          console.log('Prompt:', image.prompt);
        });
    
        // Shuffle the images
        const shuffledImages = shuffleArray(imagesWithPrompt);
    
        // Set the bottomRightImages state with the updated data
        setBottomRightImages(shuffledImages);
      } catch (error) {
        console.error('Failed to fetch bottom-right images:', error);
      }
    };

    // Initial fetch of images
    fetchBottomLeftImages();
    fetchBottomRightImages();

    // Set interval to refresh images every 7 seconds
    const intervalId = setInterval(() => {
      setBottomLeftIndex((index) => (index + 16) % bottomLeftImages.length);
      setBottomRightIndex((index) => (index + 16) % bottomRightImages.length);
    }, 7000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [bottomLeftImages.length, bottomRightImages.length]); // Run effect whenever image lists change

  // Function to slice images for display based on current index
  const getDisplayImages = (images, index) => {
    if (images.length === 0) return [];
    const slicedImages = [];
    for (let i = 0; i < 16; i++) {
      const imageIndex = (index + i) % images.length;
      slicedImages.push(images[imageIndex]);
    }
    return slicedImages.filter(image => image.imageData); // Filter out images with undefined imageData
  };

  // Function to handle opening popup and setting selected image
  const handleImageClick = (imageData, imageName) => {
    setSelectedImage(imageData);
    setSelectedImageName(imageName);
    setShowPopup(true);
  };

  // Function to handle closing popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div style={{ backgroundColor: '#0B0533' }}>
      {/* Your QOL content goes here */}
      <h1 style={{
        color: '#DD9313',
        fontFamily: 'Abhaya Libre ExtraBold',
        fontSize: '4em',
        textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
        textAlign: 'center',
        margin: '0',
        padding: '50px 0'
      }}>
        Q U A L I T Y     O F     L I F E
      </h1>
      {/* Enclosing box for the four smaller boxes */}
      <div style={{ backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', margin: '70px', width: '1000px', marginLeft: '250px' }}>
        {/* Rectangles */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Small rectangles at the top */}
          <div style={{ width: '500px', height: '100px', backgroundColor: '#B3BBC8', margin: '10px' }}></div>
          <div style={{ width: '500px', height: '100px', backgroundColor: '#B3BBC8', margin: '10px' }}></div>
        </div>

        {/* Add your QOL content/components as needed */}

        {/* Rectangles */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
          {/* Big rectangles at the bottom */}
          <div style={{ width: '500px', height: '450px', backgroundColor: '#BFBFBF', margin: '10px' }}>
            {getDisplayImages(bottomLeftImages, bottomLeftIndex).map((image, index) => (
              <img key={index} src={image.imageData} alt={`Bottom Left Image ${index}`} style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }} onClick={() => handleImageClick(image.imageData, image.prompt)} />
            ))}
          </div>
          <div style={{ width: '500px', height: '450px', backgroundColor: '#BFBFBF', margin: '10px' }}>
            {getDisplayImages(bottomRightImages, bottomRightIndex).map((image, index) => (
              <img key={index} src={image.imageData} alt={`Bottom Right Image ${index}`} style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer' }} onClick={() => handleImageClick(image.imageData, image.prompt)} />
            ))}
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, .8)', zIndex: 9998 }}>
          <div className="popup_inner" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#080328', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)', zIndex: 9999, width: '600px', height: '500px' }}>
            {/* Title Box */}
            <div style={{ textAlign: 'center', marginBottom: '30px', padding: '10px', borderRadius: '5px', backgroundColor: '#B3BBC8', width: '400px', margin: '0 auto' }}>
              <h2 style={{ margin: 0 }}>{selectedImageName}</h2>
            </div>

            {/* Selected Image */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', marginBottom: '30px' }}>
              <img src={selectedImage} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>

            <button onClick={handleClosePopup} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', background: 'none', border: 'none', color: 'white' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QOL;
