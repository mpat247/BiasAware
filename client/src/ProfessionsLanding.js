import {React, useState} from 'react';
import './ProfessionsLanding.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BusinessIcon from './images/BusinessProf.png'; // Adjust path as necessary
import HealthcareIcon from './images/HealthcareProf.png'; // Adjust path as necessary
import MaintenanceIcon from './images/MaintenanceProf.png'; // Adjust path as necessary
import EducationIcon from './images/EducationProf.png'; // Adjust path as necessary
import LabourIcon from './images/LabourProf.png'; // Adjust path as necessary
import ProfCarousel from './ProfCarousel'; // Adjust the path as necessary

const ProfessionsLanding = () => {
    
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedProfession, setSelectedProfession] = useState('');

    const handleIconClick = (profession) => {
        setSelectedProfession(profession);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedProfession('');
    };

        return (
        <div className="landing-page">
            <div className="icon business" onClick={() => handleIconClick('Business')}>
                <img src={BusinessIcon} alt="Business" />
                <span>BUSINESS</span>
            </div>
            <div className="icon healthcare" onClick={() => handleIconClick('Healthcare')}>
                <img src={HealthcareIcon} alt="Healthcare" />
                <span>HEALTHCARE</span>
            </div>
            <div className="icon maintenance" onClick={() => handleIconClick('Maintenance')}>
                <img src={MaintenanceIcon} alt="Maintenance" />
                <span>MAINTENANCE</span>
            </div>
            <div className="icon education" onClick={() => handleIconClick('Education')}>
                <img src={EducationIcon} alt="Education" />
                <span>EDUCATION</span>
            </div>
            <div className="icon labour" onClick={() => handleIconClick('Labour')}>
                <img src={LabourIcon} alt="Labour" />
                <span>LABOUR</span>
            </div>

                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-content"><div className="pop-up">
                            <span className="close-btn" onClick={closePopup}>&times;</span>
                            {selectedProfession ? (
                                <ProfCarousel selectedProfession={selectedProfession} />
                            ) : (
                                <>
                                    <h1>{selectedProfession}</h1>
                                    <p>Information about the {selectedProfession} profession.</p>
                                </>
                            )}
                        </div></div>
                    </div>
                )}
        </div>
    );
};

export default ProfessionsLanding;