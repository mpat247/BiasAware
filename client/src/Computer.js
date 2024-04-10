// Aerospace.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faChartBar, faEnvelope, faBell, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Added faCog again for the additional icon
import './Aerospace.css'; // Import the CSS file
import { Link } from 'react-router-dom';
const Computer = () => {
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
        <div className="title-aerospace">COMPUTER ENGINEER</div>
        <div className="grid-container">
          <div className="grid-item item-large">
          <img src="/computer/CompBlack.gif" alt="aero4" />
          </div>
          <div className="grid-item item-medium">
          <img src="/computer/COMP_R.gif" alt="aero4" />
          </div>
          <div className="grid-item item-long-prop">
          <img src="/computer/Comp_Stat1.gif" alt="chem_stat" /></div> 
          <div className="grid-item item-small2">
          <img src="/computer/comp1.png" alt="comp1" />
          </div>
          <div className="grid-item item-small3">
          <img src="/computer/comp2.jpeg" alt="comp2" />
          </div>
          
          <div className="grid-item item-small6">
          <img src="/computer/comp3.jpeg" alt="comp3" />
          </div>
          <div className="grid-item item-small7">
          <img src="/computer/comp4.jpeg" alt="comp4" />
          </div>
          <div className="grid-item item-long-mat">
          <img src="/computer/COMP_LGB.gif" alt="aero4" />
          </div>
          {/* You can add more grid items here with the respective class names */}
        </div>
      </main>
    </div>
    
  );
};

export default Computer;