import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Header.css";
import logo from "../../public/cryptosim.png";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "344643202177-aldp9eqnh7m202hemtc8f893cfoticgi.apps.googleusercontent.com";

/**
 * The Header  at the top of all pages. Takes no props (?)
 */
const Header = (props) => {
  return (
    <nav className="Header-container u-flex u-flex-alignCenter  u-flexjustifyEnd">
      <img className="logo" src={logo}/>
      <div className="Header-linkContainer u-inlineBlock">
        <Link to="/" className="Header-link">
          HOME
        </Link>
        
        <Link to="/dashboard/" className="Header-link">
          MAKE TRADES
        </Link>
        <Link to="/leaderboard/" className="Header-link">
          LEADERBOARD
        </Link>
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="Header-link">
            PROFILE
          </Link>
        )}
        
      </div>
    </nav>
  );
      
  
};

export default Header;
