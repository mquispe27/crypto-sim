import React, {useEffect, useState} from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import jwt_decode from "jwt-decode";

import { get } from "../../utilities";

import "./Indicator.css";


import ADA from "../../public/ADA.jpg";
import BTC from "../../public/BTC.png";
import DOGE from "../../public/DOGE.png";
import DOT from "../../public/DOT.png";
import ETH from "../../public/ETH.png";
import MATIC from "../../public/MATIC.png";
import SHIB from "../../public/SHIB.png";
import SOL from "../../public/SOL.png";
import USDT from "../../public/USDT.png";
import XRP from "../../public/XRP.png";

const api_url = "https://api.kraken.com/0/public/Ticker?pair=";

const Indicator = (props) => {
    const [price, setPrice] = useState(0);
    const [percentChange, setPercentChange] = useState(0.0);
    const [last, setLast] = useState(0.0);
    
    useEffect(() => {
      
      const intervalId = setInterval(() => {

      
      console.log(props.ind);
      switch(props.ind) {
        case "ADA":
          get("/api/ADArequest").then((crypto_data) => {

            setPrice((crypto_data.res2.body.result.ADAUSD.a[0]));
        })
        get("/api/ADAlast12request").then((crypto_data) => {
          

          setLast((crypto_data.res2.body.result.ADAUSD[0][1]));
          setPercentChange(((price-last)/last * 100).toFixed(2));
        })
        break;
        case "BTC":
          get("/api/" + props.ind + "request").then((crypto_data) => {
            

            setPrice((crypto_data.res2.body.result.XXBTZUSD.a[0]));
            
      })
      get("/api/BTClast12request").then((crypto_data) => {
          

        setLast((crypto_data.res2.body.result.XXBTZUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "DOGE":
          get("/api/DOGErequest").then((crypto_data) => {

            setPrice((crypto_data.res2.body.result.XDGUSD.a[0]));    
      })
      get("/api/DOGElast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.XDGUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "DOT":
          get("/api/DOTrequest").then((crypto_data) => {
            setPrice((crypto_data.res2.body.result.DOTUSD.a[0]));
            
      })
      get("/api/DOTlast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.DOTUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "ETH":
          get("/api/ETHrequest").then((crypto_data) => {

            setPrice((crypto_data.res2.body.result.XETHZUSD.a[0]));
            
      })
      get("/api/ETHlast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.XETHZUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "MATIC":
          get("/api/MATICrequest").then((crypto_data) => {
            setPrice((crypto_data.res2.body.result.MATICUSD.a[0]));
            
      })
      get("/api/MATIClast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.MATICUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "SOL":
          get("/api/SOLrequest").then((crypto_data) => {
            setPrice((crypto_data.res2.body.result.SOLUSD.a[0]));
            
      })
      get("/api/SOLlast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.SOLUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "SHIB":
          get("/api/SHIBrequest").then((crypto_data) => {
            setPrice((crypto_data.res2.body.result.SHIBUSD.a[0]));
            
      })
      get("/api/SHIBlast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.SHIBUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "USDT":
          get("/api/" + props.ind + "request").then((crypto_data) => {
            setPrice((crypto_data.res2.body.result.USDTZUSD.a[0]));
            
      })
      get("/api/USDTlast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.USDTZUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      case "XRP":
          get("/api/XRPrequest").then((crypto_data) => {
            setPrice((crypto_data.res2.body.result.XXRPZUSD.a[0]));
            
      })
      get("/api/XRPlast12request").then((crypto_data) => {
          
        setLast((crypto_data.res2.body.result.XXRPZUSD[0][1]));
        setPercentChange(((price-last)/last * 100).toFixed(2));
      })
      break;
      
      }
      
      }, 1000)
      return () => clearInterval(intervalId);
        
    }, [last, price])

    
    return (
      <>
      <div className="u-flex table-flex">
        {displayImage(props)}
        <div className="body-text u-bold index">{props.ind}</div>
        <div className="body-text u-bold price">{price}</div>
        <div className="body-text u-bold last">{last}</div>
        <div className="body-text u-bold change">{percentChange + "%"}</div>
      
      </div>
      </>
    );
  };

  const displayImage = (props) => {
    
    switch (props.ind) {
        case "ADA":
            return (<img className="icon" src={ADA} />)
        case "BTC":
            return (<img className="icon" src={BTC} />)
        case "DOGE":
            return (<img className="icon" src={DOGE} />)
        case "DOT":
            return (<img className="icon" src={DOT} />)
        case "ETH":
            return (<img className="icon" src={ETH} />)
        case "MATIC":
            return (<img className="icon" src={MATIC} />)
        case "SHIB":
            return (<img className="icon" src={SHIB} />)
        case "SOL":
            return (<img className="icon" src={SOL} />)
        case "USDT":
            return (<img className="icon" src={USDT} />)
        case "XRP":
            return (<img className="icon" src={XRP} />)
    }
    
}

export default Indicator;