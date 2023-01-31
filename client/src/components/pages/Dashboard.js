import React, {useState} from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import { get, post } from "../../utilities";

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
  const [option,setOption] = useState();
  const [buySell, setBuySell] = useState();
  const [quantity, setQuantity] = useState();
  const [buttonRender, setbuttonRender] = useState(false);
  const [potentialAmount, setpotentialAmount] = useState();
  



  function makeTransaction() {
    
    if (buySell != undefined && quantity != undefined && option != undefined) {
      setbuttonRender(true);
    }
    else {
      setbuttonRender(false);
    }
    calculateAmount();
  }

  function calculateAmount(){
    
    switch(option) {
      case "ADA":
        get("/api/ADArequest").then((crypto_data) => {

          setpotentialAmount((crypto_data.res2.body.result.ADAUSD.a[0]) * quantity);
      })
      
      break;
      case "BTC":
        get("/api/BTCrequest").then((crypto_data) => {
          

          setpotentialAmount((crypto_data.res2.body.result.XXBTZUSD.a[0]) * quantity);
          
    })
    
    break;
    case "DOGE":
        get("/api/DOGErequest").then((crypto_data) => {

          setpotentialAmount((crypto_data.res2.body.result.XDGUSD.a[0]) * quantity);    
    })
    break;
    case "DOT":
        get("/api/DOTrequest").then((crypto_data) => {
          setpotentialAmount((crypto_data.res2.body.result.DOTUSD.a[0]) * quantity);
          
    })
    break;
    case "ETH":
        get("/api/ETHrequest").then((crypto_data) => {

          setpotentialAmount((crypto_data.res2.body.result.XETHZUSD.a[0]) * quantity);
          
    })
    break;
    case "MATIC":
        get("/api/MATICrequest").then((crypto_data) => {
          setpotentialAmount((crypto_data.res2.body.result.MATICUSD.a[0]) * quantity);
          
    })
    break;
    case "SOL":
        get("/api/SOLrequest").then((crypto_data) => {
          setpotentialAmount((crypto_data.res2.body.result.SOLUSD.a[0]) * quantity);
          
    })
    break;
    case "SHIB":
        get("/api/SHIBrequest").then((crypto_data) => {
          setpotentialAmount((crypto_data.res2.body.result.SHIBUSD.a[0]) * quantity);
          
    })
    break;
    case "USDT":
        get("/api/USDTrequest").then((crypto_data) => {
          setpotentialAmount((crypto_data.res2.body.result.USDTZUSD.a[0]) * quantity);
          
    })
    break;
    case "XRP":
        get("/api/XRPrequest").then((crypto_data) => {
          setpotentialAmount((crypto_data.res2.body.result.XXRPZUSD.a[0]) * quantity);
          
    })
    break;

  }
}
  async function actuallyMakeTransaction() {
    if (props.googleid == "?") {
      alert("Transaction did not go through. Reload or log in and try again.");
      return;
    }
    
    

    if (buySell == "buy") {
      const cash  = await get(`/api/userCryptoRequest`, { googleid: props.googleid });
      if (cash.cash.$numberDecimal < potentialAmount) {
        alert("Error: You do not have enough cash! Please buy fewer crypto and try again.");
        return;
      }
      
      
      post("/api/transactionUpdateRequest", {
        googleid: props.googleid,
        cash: potentialAmount,
        numCryptosOwned: quantity,
        cryptosOwned: option,
        valsAtPurchase: potentialAmount,
        dates: new Date().toLocaleString()


      }).then((userCryptoObj) => {alert("Transaction complete!")});
    }

    else if (buySell == "sell") {
      const req  = await get(`/api/userCryptoRequest`, { googleid: props.googleid });
      const cryptosOwned = req.cryptosOwned;
      const numCryptosOwned = req.numCryptosOwned;


    let ADAnum = 0;
    let BTCnum = 0;
    let DOGEnum = 0;
    let DOTnum = 0;
    let ETHnum = 0;
    let MATICnum = 0;
    let SHIBnum = 0;
    let SOLnum = 0;
    let USDTnum = 0;
    let XRPnum = 0;
    if (cryptosOwned != undefined && numCryptosOwned != undefined) {
      for (let i = 0; i < cryptosOwned.length; i++) {
        switch(cryptosOwned[i]) {
          case "ADA":
            ADAnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "BTC":
            BTCnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "DOGE":
            DOGEnum = parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "DOT":
            DOTnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "ETH":
            ETHnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "MATIC":
            MATICnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "SHIB":
            SHIBnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "SOL":
            SOLnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "USDT":
            USDTnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
          case "XRP":
            XRPnum += parseFloat(numCryptosOwned[i].$numberDecimal);
            break;
        }
      }
      switch (option) {
        case "ADA":
          if (quantity > ADAnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "BTC":
          if (quantity > BTCnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "DOGE":
          if (quantity > DOGEnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "DOT":
          if (quantity > DOTnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "ETH":
          if (quantity > ETHnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "MATIC":
          if (quantity > MATICnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "SHIB":
          if (quantity > SHIBnum) {
            alert("You are selling more than you have. You have " + SHIBnum + " SHIB. Please try again.");
            return;
          }
          break;
        case "SOL":
          if (quantity > SOLnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "USDT":
          if (quantity > USDTnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
        case "XRP":
          if (quantity > XRPnum) {
            alert("You are selling more than you have. Please try again.");
            return;
          }
          break;
      }
    



      post("/api/transactionUpdateRequest", {
        googleid: props.googleid,
        cash: -1 * potentialAmount,
        numCryptosOwned: -1 * quantity,
        cryptosOwned: option,
        valsAtPurchase: -1 * potentialAmount,
        dates: new Date().toLocaleString()


      }).then((userCryptoObj) => {alert("Transaction complete!")});
    }


  }
}








  function handleChange(event){
    setbuttonRender(false);
    return setOption(event.target.value).then(() => calculateAmount());
    
  }
  function handleChange2(event){
    setbuttonRender(false);
    return setBuySell(event.target.value).then(() => calculateAmount());
    
  }
  function handleChange3(event){
    setbuttonRender(false);
    if (event.target.value != undefined)
      return setQuantity(event.target.value).then(() => calculateAmount());
    
  }
  function renderButton(event){
    setQuantity(event.target.value);
  }
  

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

      <div className= "u-bold bodytext u-textCenter">
          <div>Buy/Sell Crypto!</div>
          <select id = "dropdown2" onChange={handleChange2} >  
            <option> ---Choose--- </option>  
            <option value = "buy"> BUY </option>
            <option value = "sell"> SELL </option>
          </select>
          <input id="text-box"type="text" onChange={handleChange3}/>

          <select id = "dropdown" onChange={handleChange} >  
              <option> ---Choose a crypto coin--- </option>  
              <option value = "ADA"> ADA (Cardano) </option>  
              <option value = "BTC"> BTC (Bitcoin) </option>  
              <option value = "DOGE"> DOGE (Dogecoin) </option>  
              <option value = "ETH"> ETH (Ethereum)</option>  
              <option value = "MATIC"> MATIC (Polygon) </option>  
              <option value = "SHIB"> SHIB (Shiba Inu) </option>  
              <option value = "SOL"> SOL (Solana) </option>  
              <option value = "USDT"> USDT (Tether)</option>
              <option value = "XRP"> XRP </option>
          </select>
          
        
        <div>You chose to {buySell} {quantity} {option} </div>
        
        <button className="transaction" onClick={makeTransaction}>Make Transaction</button>
        {buttonRender ? 
        (<>
          <div>Please confirm: {buySell} {quantity} {option} for {potentialAmount }</div>
          <button className = "transaction" onClick ={actuallyMakeTransaction}> CONFIRM </button>
        </>) 
      : (<></>) }
      </div>
      
    </div>
    </>
  );
};

export default Dashboard;
