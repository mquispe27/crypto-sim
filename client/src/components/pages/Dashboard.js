import React, {useState} from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Dashboard.css";
import Indicator from "../modules/Indicator.js";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "344643202177-aldp9eqnh7m202hemtc8f893cfoticgi.apps.googleusercontent.com";
const INDICATORS = ["ADA", "BNB", "BTC", "DOGE", "DOT", "ETH", "MATIC", "SOL", "USDT", "XRP"];
const api_url = "https://api.kraken.com/0/public/Ticker?pair=";

/**
 * The Dashboard where you can see prices and make trades.
 */
const Dashboard = (props) => {
  

  return (
    <>
    <h1 className = "text">Current Prices of the Top 10 Cryptos</h1>
    <div className = "listContainer">
      
      {INDICATORS.map((indicator) => <Indicator ind={indicator}/>)}
      
    </div>
    </>
  );
};

export default Dashboard;
