import React, { useEffect } from 'react';
import './LandingPage.css';
import Responsive from './Responsive';
const LandingPage = () => {
  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    // Create a div element for container
    const container = document.createElement('div');
    container.classList.add('container');

    // Create a div element for main section
    const main = document.createElement('div');
    main.classList.add('main');

    // Create an h1 element for "Exploring the"
    const h1 = document.createElement('h1');
    h1.textContent = 'Exploring the';
    
    // Create an h2 element for "Dark Side of Net"
    const h2 = document.createElement('h2');
    h2.textContent = 'Dark Side of Net';

    // Append the h1 and h2 elements to the main section
    main.appendChild(h1);
    main.appendChild(h2);

    // Create a div element for icon container
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('iconcontainer');

    // Create left icon div
    const leftIcon = document.createElement('div');
    leftIcon.classList.add('icon');
    leftIcon.id = 'left';
    

    // Create right icon div
    const rightIcon = document.createElement('div');
    rightIcon.classList.add('icon');
    rightIcon.id = 'right';
    

    // Append left and right icons to icon container
    iconContainer.appendChild(leftIcon);
    iconContainer.appendChild(rightIcon);

    // Append main and icon container to the main container
    container.appendChild(main);
    container.appendChild(iconContainer);
   
    // Append the container to the body
    document.body.appendChild(container);

    // Fade away after 7 seconds
    setTimeout(() => {
      h1.style.opacity = '0';
      h2.style.opacity = '0';

      // Create a div element for the new header
      const newHeader = document.createElement('h1');
      newHeader.textContent = "It's the Year 2024";
      newHeader.classList.add('new-header');
      // Append the new header to the main section
      main.appendChild(newHeader);

      // Fade out left icon by animating it with existing keyframes
      leftIcon.style.opacity = '1'; // Initial opacity set to 1
      leftIcon.style.animationName = 'fadeToLeft';
      leftIcon.style.animationDuration = '2s';
      leftIcon.style.animationFillMode = 'forwards';

      // Fade out right icon by animating it with existing keyframes
      rightIcon.style.opacity = '1'; // Initial opacity set to 1
      rightIcon.style.animationName = 'fadeToRight';
      rightIcon.style.animationDuration = '2s';
      rightIcon.style.animationFillMode = 'forwards';

      // Show new sentence after 5 seconds
      setTimeout(() => {
        newHeader.style.opacity = '0';
        // Create a div element for the new sentence
        leftIcon.style.opacity = '0';
        rightIcon.style.opacity = '0'; 
        const newSentence = document.createElement('p');
        newSentence.textContent = "AI image generators, like GANs, can perpetuate harmful stereotypes by replicating biases present in their training data. This can lead to discriminatory outcomes and reinforce societal inequalities.";
        newSentence.classList.add('new-sentence');
        // Append the new sentence to the main section
        main.appendChild(newSentence);
        // Fade out left icon by animating it with existing keyframes
      //leftIcon.style.opacity = '1'; // Initial opacity set to 1
      leftIcon.style.animationName = 'fadeUpdateLeft';
      leftIcon.style.animationDuration = '2s';
      leftIcon.style.animationFillMode = 'forwards';

      // Fade out right icon by animating it with existing keyframes
      //rightIcon.style.opacity = '1'; // Initial opacity set to 1
      rightIcon.style.animationName = 'fadeUpdateRight';
      rightIcon.style.animationDuration = '2s';
      rightIcon.style.animationFillMode = 'forwards';
      // Show new sentence after 5 seconds
      setTimeout(() => {
        newSentence.style.opacity = '0';
        // Create a div element for the new sentence
        leftIcon.style.opacity = '0';
        rightIcon.style.opacity = '0'; 
        const newSentence2 = document.createElement('p');
        newSentence2.textContent = "Addressing these biases is crucial to ensure that AI technologies promote diversity and inclusivity.";
        newSentence2.classList.add('new-sentence');
        // Append the new sentence to the main section
        main.appendChild(newSentence2);
        // Fade out left icon by animating it with existing keyframes
      leftIcon.style.opacity = '1'; // Initial opacity set to 1
      leftIcon.style.animationName = 'fadeToLeft';
      leftIcon.style.animationDuration = '2s';
      leftIcon.style.animationFillMode = 'forwards';

      // Fade out right icon by animating it with existing keyframes
      rightIcon.style.opacity = '1'; // Initial opacity set to 1
      rightIcon.style.animationName = 'fadeToRight';
      rightIcon.style.animationDuration = '2s';
      rightIcon.style.animationFillMode = 'forwards';
      // Trigger typing animation for the new sentence
      typeWriter(newSentence2);
      // After all animations, show the gear icon
      setTimeout(() => {
        const gearContainer = document.createElement('div');
        //gearContainer.classList.add('explore-container');

        //const exploreText = document.createElement('p2');
        //exploreText.textContent = 'Explore';
        //exploreText.classList.add('explore-text');

        const gearIcon = document.createElement('img');
        gearIcon.src = "/gears/gearLeft.png";
        gearIcon.alt = 'Gear Icon';
        gearIcon.className = 'gear-icon';
        // Append the new sentence to the main section
        //gearContainer.appendChild(exploreText);
        //main.appendChild(exploreText);
        main.appendChild(gearIcon);
        iconContainer.appendChild(gearIcon);
        //iconContainer.appendChild(exploreText);
        // Add click event listener to the gear icon
        gearIcon.addEventListener('click', handleIconClick);

        // Append the gear icon to the body
        //document.body.appendChild(gearIcon);
      }, 10000); // Adjust the delay according to your animations
      }, 10000);
      }, 5000); // 5 seconds delay for new sentence
    }, 7000); // 7 seconds delay for initial fade out
    // Remove the CSS class to allow scrolling when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
      
    };
  }, []);

  // Function to handle clicking on the icon
  const handleIconClick = () => {
    // Navigate to Responsive.css file

  };
  function typeWriter(element) {
    const text = element.textContent;
    element.textContent = ''; // Clear the element's content
  
    let i = 0;
    const speed = 90; // Adjust typing speed as needed
  
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
  
    // Start typing animation
    type();
     
  }
  
  return null;
  
};

export default LandingPage;