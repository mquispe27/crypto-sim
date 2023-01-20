import React, {useEffect, useState} from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import jwt_decode from "jwt-decode";

import { get } from "../../utilities";

import "./Indicator.css";

const api_url = "https://api.kraken.com/0/public/Ticker?pair=";

const Indicator = (props) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {  
        get("/api/samplerequest").then((crypto_data) => {
            console.log(crypto_data);
            setPrice(JSON.stringify(crypto_data));
        })
    }, [price])

    
    return (
      <>
      <div className="body-text">{api_url + props.ind + "USD"}</div>
      <div className="body-text">{price}</div>
      </>
    );
  };

export default Indicator;