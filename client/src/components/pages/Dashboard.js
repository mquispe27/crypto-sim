import React, {useState} from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Dashboard.css";
import Indicator from "../modules/Indicator.js";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "344643202177-aldp9eqnh7m202hemtc8f893cfoticgi.apps.googleusercontent.com";
const INDICATORS = ["ADA", "BTC", "DOGE", "DOT", "ETH", "MATIC", "SHIB", "SOL", "USDT", "XRP"];
const api_url = "https://api.kraken.com/0/public/Ticker?pair=";

/**
 * The Dashboard where you can see prices and make trades.
 */
const Dashboard = (props) => {
  

  return (
    <>
    <h1 className = "text">Current Prices of the Top 10 Cryptos</h1>
    <div className = "listContainer bodytext">
      <div className = "u-flex table-flex u-bold">
        <div className="extra-space"> SYMBOL </div>
        <div> PRICE</div>
        <div> LAST (12 HOURS)</div>
        <div> PERCENT CHANGE</div>
      </div>
      {INDICATORS.map((indicator) => <Indicator key={indicator} ind={indicator}/>)}

      
      
    </div>
    </>
  );
};

export default Dashboard;
