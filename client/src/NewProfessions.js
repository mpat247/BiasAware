import React from 'react';
import './NewProfessions.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import BusinessIcon from './images/BusinessProf.png'; // Adjust path as necessary
import HealthcareIcon from './images/HealthcareProf.png'; // Adjust path as necessary
import MaintenanceIcon from './images/MaintenanceProf.png'; // Adjust path as necessary
import EducationIcon from './images/EducationProf.png'; // Adjust path as necessary
import LabourIcon from './images/LabourProf.png'; // Adjust path as necessary

const categories = [
    { name: 'Business', color: '#3498db', icon: 'https://via.placeholder.com/50x50/3498db/ffffff?text=Business' },
    { name: 'Healthcare', color: '#2ecc71', icon: 'https://via.placeholder.com/50x50/2ecc71/ffffff?text=Healthcare' },
    { name: 'Maintenance', color: '#e74c3c', icon: 'https://via.placeholder.com/50x50/e74c3c/ffffff?text=Education' },
    { name: 'Education', color: '#f1c40f', icon: 'https://via.placeholder.com/50x50/f1c40f/ffffff?text=Maintenance' },
    { name: 'Technology', color: '#9b59b6', icon: 'https://via.placeholder.com/50x50/9b59b6/ffffff?text=Labour' }
  ];
  

  const ProfessionsLanding = () => {
    return (
        <div className="professions-landing-page-container">
          <div class="category">
            <a href="#" class="category-item">
              <span class="category-item-title">Business</span>
              {/* <img class="category-item-img" src="https://web2dev.ru/other/codepen/1.png" alt=""/> */}
              {/* <img class="category-item-img" src={MaintenanceIcon} alt="Maintenance" /> */}
            </a>
            <a href="#" class="category-item">
              <span class="category-item-title">Healthcare</span>
              {/* <img class="category-item-img" src="https://web2dev.ru/other/codepen/2.png" alt=""/> */}
              {/* <img class="category-item-img" src={MaintenanceIcon} alt="Maintenance" /> */}
            </a>
            <a href="#" class="category-item">
              <span class="category-item-title">Maintenance</span>
              {/* <img class="category-item-img" src="https://web2dev.ru/other/codepen/3.png" alt=""/> */}
              {/* <img class="category-item-img" src={MaintenanceIcon} alt="Maintenance" /> */}
            </a>
            <a href="#" class="category-item">
              <span class="category-item-title">Education</span>
              {/* <img class="category-item-img" src="https://web2dev.ru/other/codepen/4.png" alt=""/> */}
              {/* <img class="category-item-img" src={MaintenanceIcon} alt="Maintenance" /> */}
            </a>
            <a href="#" class="category-item">
              <span class="category-item-title">Labour</span>
              {/* <img class="category-item-img" src="https://web2dev.ru/other/codepen/5.png" alt=""/> */}
              {/* <img class="category-item-img" src={MaintenanceIcon} alt="Maintenance" /> */}
            </a>
          </div>
        </div>
    );
};

export default ProfessionsLanding;