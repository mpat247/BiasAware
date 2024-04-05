// Aerospace.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faChartBar, faEnvelope, faBell, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Aerospace.css'; // Import the CSS file

const Aerospace = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <FontAwesomeIcon icon={faHome} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faUser} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faCog} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faChartBar} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faEnvelope} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faBell} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faQuestionCircle} size="2x" onClick={toggleExpand} />
        <FontAwesomeIcon icon={faSignOutAlt} size="2x" onClick={toggleExpand} />
      </div>
      <div className={`expanded-window ${expanded ? 'active' : ''}`} onClick={toggleExpand}></div>
    </div>
  );
};

export default Aerospace;
