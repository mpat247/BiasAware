import React from 'react';
import './ProfessionsLanding.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BusinessIcon from './images/BusinessProf.png'; // Adjust path as necessary
import HealthcareIcon from './images/HealthcareProf.png'; // Adjust path as necessary
import MaintenanceIcon from './images/MaintenanceProf.png'; // Adjust path as necessary
import EducationIcon from './images/EducationProf.png'; // Adjust path as necessary
import LabourIcon from './images/LabourProf.png'; // Adjust path as necessary

const ProfessionsLanding = () => {
    return (
        <div className="landing-page">
            <h1 style={{
  color: '#DD9313',
  fontFamily: 'Abhaya Libre ExtraBold',
  fontSize: '4em',
  textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
  textAlign: 'center',
  margin: ' auto 0 auto',
  padding: '50px 0'
}}>
  {/* P R O F E S S I O N S */}
</h1>
            <div className="icon business">
                <Link to="/Professions">
                    <img src={BusinessIcon} alt="Business" />
                </Link>
                <span>BUSINESS</span>
            </div>
            <div className="icon healthcare">
                <Link to="/Professions">
                    <img src={HealthcareIcon} alt="Healthcare" />
                </Link>
                <span>HEALTHCARE</span>
            </div>
            <div className="icon maintenance">
                <Link to="/Professions">
                    <img src={MaintenanceIcon} alt="Maintenance" />
                </Link>
                <span>MAINTENANCE</span>
            </div>
            <div className="icon education">
                <Link to="/Professions">
                    <img src={EducationIcon} alt="Education" />
                </Link>
                <span>EDUCATION</span>
            </div>
            <div className="icon labour">
                <Link to="/Professions">
                    <img src={LabourIcon} alt="Labour" />
                </Link>
                <span>LABOUR</span>
            </div>
        </div>
    );
};

export default ProfessionsLanding;
