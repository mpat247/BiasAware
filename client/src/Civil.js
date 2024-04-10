// Aerospace.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faChartBar, faEnvelope, faBell, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Added faCog again for the additional icon
import './Aerospace.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const Civil = () => {
  const boxes = ['AEROSPACE ENGINEER', 'BOX 1', 'BOX 2', 'BOX 3', 'BOX 4', 'BOX 5', 'BOX 6', 'BOX 7', 'BOX 8', 'BOX 9', 'BOX 10', 'BOX 11', 'BOX 12', 'BOX 13'];
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
    <div className="sidebar">
    <div className="sidebar-icons">
      <Link to="/Engineering"> {/* Link to Engineering page */}
        <FontAwesomeIcon icon={faHome} size="1x" onClick={toggleExpand} />
      </Link>
      <Link to="/Aerospace"> {/* Link to Engineering page */}
        <img src="/engineering/Aerospace.png" alt="Aerospace" onClick={toggleExpand} />
      </Link>
      <Link to="/Biomedical"> {/* Link to Engineering page */}
        <img src="/engineering/Biomedical.png" alt="Biomedical" onClick={toggleExpand} />
      </Link>
      <Link to="/Chemical"> {/* Link to Engineering page */}
        <img src="/engineering/Chemical.png" alt="Chemical" onClick={toggleExpand} />
        </Link>
        <Link to="/Civil"> {/* Link to Engineering page */}
        <img src="/engineering/Civil.png" alt="Civil" onClick={toggleExpand} />
        </Link>
        <Link to="/Computer"> {/* Link to Engineering page */}
        <img src="/engineering/Computer.png" alt="Computer" onClick={toggleExpand} />
        </Link>
        <Link to="/Electrical"> {/* Link to Engineering page */}
        <img src="/engineering/Electrical.png" alt="Electrical" onClick={toggleExpand} />
        </Link>
        <Link to="/Industrial"> {/* Link to Engineering page */}
        <img src="/engineering/Industrial.png" alt="Industrial" onClick={toggleExpand} />
        </Link>
        <Link to="/Mechanical"> {/* Link to Engineering page */}
        <img src="/engineering/Mechanical.png" alt="Mechanical" onClick={toggleExpand} />
        </Link>
      </div>
      
      </div>
      <main className="main-content">
        <div className="title-aerospace">CIVIL ENGINEER</div>
        <div className="grid-container">
          <div className="grid-item item-large">
          <img src="/civil/CivilBlack.gif" alt="aero4" />
          </div>
          <div className="grid-item item-medium">
          <img src="/civil/CIVIL_R.gif" alt="aero4" />
          </div>
          <div className="grid-item item-long-prop">
          <img src="/civil/Civil_Stat1.gif" alt="chem_stat" /></div> 
          <div className="grid-item item-small2">
          <img src="/civil/civil1.jpeg" alt="civil1" />
          </div>
          <div className="grid-item item-small3">
          <img src="/civil/civil2.jpeg" alt="civil2" />
          </div>
          
          <div className="grid-item item-small6">
          <img src="/civil/civil3.png" alt="civil3" />
          </div>
          <div className="grid-item item-small7">
          <img src="/civil/civil4.jpeg" alt="civil4" />
          </div>
          <div className="grid-item item-long-mat">
          <img src="/civil/CIVIL_LGB.gif" alt="aero4" />
          </div>
          {/* You can add more grid items here with the respective class names */}
        </div>
      </main>
    </div>
    
  );
};

export default Civil;