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
            {/* { <button className="icon business" onClick={() => {}}>
                <img src={BusinessIcon} alt="Business" />
            </button> */}
            {/* <button className="icon healthcare" onClick={() => {}}>
                <img src={HealthcareIcon} alt="Healthcare" />
            </button> */}
            {/* <button className="icon labour" onClick={() => {}}>
                <img src={LabourIcon} alt="Labour" />
            </button>  */}
            {/* <button className="icon education" onClick={() => {}}>
                <img src={EducationIcon} alt="Education" />
            </button> */}
            <Link className="icon business" to="/Professions">
                <img src={BusinessIcon} alt="Business" />
            </Link>
            <Link className="icon healthcare" to="/Professions">
                <img src={HealthcareIcon} alt="Healthcare" />
            </Link>
            <Link className="icon maintenance" to="/Professions">
                <img src={MaintenanceIcon} alt="Maintenance" />
            </Link>
            <Link className="icon education" to="/Professions">
                <img src={EducationIcon} alt="Education" />
            </Link>
            <Link className="icon labour" to="/Professions">
                <img src={LabourIcon} alt="Labour" />
            </Link>
            {/* <button className="icon maintenance" onClick={() => {}}>
                <img src={MaintenanceIcon} alt="Maintenance" />
            </button> */}
        </div>
    );
};

export default ProfessionsLanding;
