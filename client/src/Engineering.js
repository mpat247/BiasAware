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
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>AEROSPACE</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/biomedical" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>BIOMEDICAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/chemical" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>CHEMICAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/civil" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>CIVIL</div> {/* Title below the inner box */}
        </div>
      </div>
      <div className={EngineeringStyling["content-container"]}>
        <h1 className="engineering-title">E N G I N E E R I N G</h1>
        {/* Add other content as needed */}
      </div>
      <div className={`${EngineeringStyling["small-squares"]} ${EngineeringStyling["below-title"]}`}>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/computer" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>COMPUTER</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/electrical" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>ELECTRICAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/industrial" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>INDUSTRIAL</div> {/* Title below the inner box */}
        </div>
        <div className={EngineeringStyling["small-square"]}>
          <Link to="/mechanical" className={EngineeringStyling["inner-box"]}>
            <div className={EngineeringStyling["inner-box"]}></div>
          </Link>
          <div className={EngineeringStyling["title"]}>MECHANICAL</div> {/* Title below the inner box */}
        </div>
      </div>
    </div>
  );
};

export default Engineering;