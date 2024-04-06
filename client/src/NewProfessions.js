import React from 'react';
import './NewProfessions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faSmile, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

const NewProfessions = () => {
  return (
    <div id="wrapper">
      <div id="wheel">
        <div id="inner-wheel">
          <div className="sec"><FontAwesomeIcon icon={faBell} /></div>
          <div className="sec"><FontAwesomeIcon icon={faComment} /></div>
          <div className="sec"><FontAwesomeIcon icon={faSmile} /></div>
          <div className="sec"><FontAwesomeIcon icon={faHeart} /></div>
          <div className="sec"><FontAwesomeIcon icon={faStar} /></div>
        </div>
        <div id="shine"></div>
      </div>
      <div id="txt"></div>
    </div>
  );
};

export default NewProfessions;
