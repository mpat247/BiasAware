import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const LandingPage = ({ closeLandingPage }) => {
  const [showSecondTitle, setShowSecondTitle] = useState(false);
  const [showThirdSentence, setShowThirdSentence] = useState(false);
  const [showFourthSentence, setShowFourthSentence] = useState(false);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const fourthSentence = "Join us in unraveling the complexities of AI-generated content and exploring its implications on societal perceptions and attitudes.";
  
  useEffect(() => {
    const secondTitleTimeout = setTimeout(() => {
      setShowSecondTitle(true);
    }, 7000);

    const thirdSentenceTimeout = setTimeout(() => {
      setShowThirdSentence(true);
    }, 14000); // Show third sentence after 7 seconds of showing second title

    const fourthSentenceTimeout = setTimeout(() => {
      setShowFourthSentence(true);
    }, 21000); // Show fourth sentence after 10 seconds of showing third sentence

    return () => {
      clearTimeout(secondTitleTimeout);
      clearTimeout(thirdSentenceTimeout);
      clearTimeout(fourthSentenceTimeout);
    };
  }, []);

  useEffect(() => {
    if (showFourthSentence) {
      const typingInterval = setInterval(() => {
        setTypedCharacters(prevTypedCharacters => {
          if (prevTypedCharacters === fourthSentence.length) {
            clearInterval(typingInterval);
          }
          return prevTypedCharacters + 1;
        });
      }, 100); // Adjust typing speed here (in milliseconds)

      return () => clearInterval(typingInterval);
    }
  }, [showFourthSentence]);

 
  return (
    <div className="landing-page">
      <div className="container">
        <button
          onClick={closeLandingPage}
          style={{
            position: 'fixed', // Changed to fixed as per your original example
            top: '5px', // Adjusted to slightly higher, similar to .close-button-emotions
            right: '5px', // Adjusted to slightly to the left, similar to .close-button-emotions
            padding: '3px 8px', // Smaller padding as per the .close-button-emotions
            border: 'none',
            borderRadius: '5px', // Adjusted to match .close-button-emotions
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            zIndex: '100000', // Very high z-index to ensure it's on top
            background: 'transparent', // Gradient background maintained
            color: 'white', // Text color white to ensure visibility
            pointerEvents: 'auto' // Ensure the button is clickable
          }}
        >
          <FontAwesomeIcon icon={faTimes} /> {/* FontAwesome icon used */}
        </button>


        <div className="main">

          {!showFourthSentence && !showThirdSentence && !showSecondTitle && <h1 className = "mainTitle"><span className="highlight">Dark Side of the Net </span><br /> Exploring Social Biases in <br />AI Image Generators</h1>}
          {showSecondTitle && !showFourthSentence && !showThirdSentence && <h2 className = "secondPage"><span className="AITitle">AI Image Generators </span><br /> Catalysts for Creativity <br /> or <br /> Harbingers of Ethical Dilemmas?</h2>}
          {showThirdSentence && !showFourthSentence && (
            <p className="landing-page-ptag"><span className="slideThree">With our increased reliance on generative tools, we must question: </span><br/> Could these tools unintentionally reinforce existing biases in their generated content?</p>          )}
          {showFourthSentence && (
            <p className="landing-page-ptag">{fourthSentence.substring(0, typedCharacters)}</p>
          )}
        </div>
        {!showFourthSentence && !showThirdSentence && !showSecondTitle && (
          <div className="iconcontainer">
            <div className="icon" id="left-second"></div>
            <div className="icon" id="right-second"></div>
          </div>
        )}
        {showSecondTitle && !showFourthSentence && !showThirdSentence && (
          <div className="iconcontainer">
            <div className="icon" id="left"></div>
            <div className="icon" id="right"></div>
          </div>
        )}
        {(showThirdSentence || showFourthSentence) && (
          <div className="iconcontainer">
            <div className="icon" id="left-second"></div>
            <div className="icon" id="right-second"></div>
          </div>
        )}
        {(showFourthSentence) && (
          <div className="iconcontainer">
            <div className="icon" id="left"></div>
            <div className="icon" id="right"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;