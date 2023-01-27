import React from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Footer.css";

const Footer = (props) => {

    return (
        <div className="footer-size u-flex">
          <div > Copyright © 2023 by Matthew Quispe. Created as part of MIT Web Lab. </div>

        </div>
      );

    
}

export default Footer;