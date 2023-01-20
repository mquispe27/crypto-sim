import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";
import logo from "../../public/cryptosim.png";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "344643202177-aldp9eqnh7m202hemtc8f893cfoticgi.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      
      <div className="temp">
      
      
      <h1 className = "u-textCenter">Trade the world’s most popular cryptocurrencies. </h1>
      <h2 className = "u-textCenter">No money needed. </h2>
      <h2 className = "u-textCenter"> Go from rags to riches through the power of </h2>
      <div className="u-textCenter ">
        <img src={logo} className="skeletonLogo"></img>
      </div>
      <div className = "u-textCenter">Play with a Google account now! </div>
      {userId ? (
        <button className="u-textCenter googleButton"
          onClick={() => {
            googleLogout();
            handleLogout();
          }}
        >
          Logout
        </button>
      ) : (
        
        <GoogleLogin className="u-textCenter googleButton" onSuccess={handleLogin} onError={(err) => console.log(err)} />
        
      )}
      
      </div>
    </GoogleOAuthProvider>
  );
};

export default Skeleton;
