// import React from 'react';
// import './GalleriesLanding.css';
// import Galleries from './Galleries';

// const GalleriesLanding = () => {
//   return (
//     <div className="galleries-landing-container">
//         <h1 className="galleries-landing-title">GALLERY</h1>
//         <div className="galleries-landing-all-three-container">
//           <div className="galleries-landing-individual-container">
//             <h1 className="galleries-landing-individual-titles">Age</h1>
//             <Galleries />
//           </div>
//           <div className="galleries-landing-individual-container">
//             <h1 className="galleries-landing-individual-titles">Gender</h1>
//             <Galleries />
//           </div>
//           <div className="galleries-landing-individual-container">
//             <h1 className="galleries-landing-individual-titles">Race</h1>
//             <Galleries />
//           </div>
//         </div>
//     </div>
//   );
// };

// export default GalleriesLanding;

// GalleriesLanding.js
import React from 'react';
import './GalleriesLanding.css';
import Galleries from './Galleries';

const GalleriesLanding = () => {

    const images = [
        1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001,
        1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001,
        1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001,
        1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001,
        1081, 1014, 267, 266, 634, 923, 682, 173, 943, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1001
    
      ]


  // Create three different sets of images for each gallery
  const imagesSet1 = createImageSet(0, images);
  const imagesSet2 = createImageSet(1, images);
  const imagesSet3 = createImageSet(2, images);


  return (
    <div className="galleries-landing-container">
        <h1 className="galleries-landing-title">GALLERY</h1>
        <div className="galleries-landing-all-three-container">
          <div className="galleries-landing-individual-container">
            <h1 className="galleries-landing-individual-titles">Age</h1>
            <Galleries images={imagesSet1} />
          </div>
          <div className="galleries-landing-individual-container">
            <h1 className="galleries-landing-individual-titles">Gender</h1>
            <Galleries images={imagesSet2} />
          </div>
          <div className="galleries-landing-individual-container">
            <h1 className="galleries-landing-individual-titles">Race</h1>
            <Galleries images={imagesSet3} />
          </div>
        </div>
    </div>
  );
};

// Function to create a unique set of images based on some criteria or ID

  // Here, you would create your unique sets of images based on the setId
  // For example, you might have different arrays or sources for age, gender, race, etc.
  // Return an array of image objects { src, alt } that is unique for each setId
  // ...
  function createImageSet(setId, allImages) {
    // Shuffle the array of images using the Fisher-Yates (Durstenfeld) shuffle algorithm
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    }
  
    // Shuffle the array and create three unique sets
    const shuffledImages = shuffleArray([...allImages]); // Create a copy of the array and shuffle it
    const setLength = Math.floor(shuffledImages.length / 3); // Divide by 3 to create three sets
  
    // Slice the shuffled array into three sets
    const sets = [
      shuffledImages.slice(0, setLength),
      shuffledImages.slice(setLength, setLength * 2),
      shuffledImages.slice(setLength * 2)
    ];
  
    // Convert array of IDs to array of image objects
    const imageObjects = sets[setId].map(i => {
      const size = 200 * [5, 6, 7, 8][Math.floor(Math.random() * 4)];
      return {
        src: `https://unsplash.it/${size}/${size}?image=${i}`,
        alt: `Gallery image ${i}`,
      };
    });
  
    return imageObjects;
  }
  
  export default GalleriesLanding;