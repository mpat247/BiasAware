import React from 'react';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import EngineeringStyling from './EngineeringStyling.module.css'; // Import CSS module
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const Engineering = () => {
  return (
    <div className={EngineeringStyling["Engineering"]}>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </Helmet>
      <NavigationBar /> {/* Include the NavigationBar component */}
      <div className={`${EngineeringStyling["small-squares"]} ${EngineeringStyling["above-title"]}`}>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/aerospace" className={EngineeringStyling["inner-box"]}>
            <img src="/aerospace/main_areo.jpg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>AEROSPACE</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/biomedical" className={EngineeringStyling["inner-box"]}>
            <img src="/biomedical/main_bio.jpeg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>BIOMEDICAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/chemical" className={EngineeringStyling["inner-box"]}>
            <img src="/chemical/main_chem.png" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>CHEMICAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/civil" className={EngineeringStyling["inner-box"]}>
            <img src="/civil/main_civil.jpg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>CIVIL</div> {/* Title below the inner box */}
        </div>
      </div>
      <div className={EngineeringStyling["content-container"]}>
        <h1 className={EngineeringStyling["engineering-title"]}>ENGINEERING</h1>
        {/* Add other content as needed */}
      </div>
      <div className={`${EngineeringStyling["small-squares"]} ${EngineeringStyling["below-title"]}`}>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/computer" className={EngineeringStyling["inner-box"]}>
            <img src="/computer/main_comp.jpeg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>COMPUTER</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/electrical" className={EngineeringStyling["inner-box"]}>
            <img src="/electrical/main_ele.jpeg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>ELECTRICAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/industrial" className={EngineeringStyling["inner-box"]}>
            <img src="/industrial/main_ind.jpeg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>INDUSTRIAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/mechanical" className={EngineeringStyling["inner-box"]}>
            <img src="/mechanical/main_mec.jpeg" alt="Aerospace" className={EngineeringStyling["inner-box"]} />
          </Link>
          <div className={EngineeringStyling["title"]}>MECHANICAL</div> {/* Title below the inner box */}
        </div>
      </div>
    </div>
  );
};

export default Engineering;