import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";



const Profile = (props) => {
  //const [catHappiness, setCatHappiness] = useState(0);
  const [user, setUser] = useState();
  
  const [balance, setBalance] = useState(0);
  const [cash, setCash] = useState(0);

  const [numADA, setADA] = useState(0);
  const [numBTC, setBTC] = useState(0);
  const [numDOGE, setDOGE] = useState(0);
  const [numDOT, setDOT] = useState(0);
  const [numETH, setETH] = useState(0);
  const [numMATIC, setMATIC] = useState(0);
  const [numSHIB, setSHIB] = useState(0);
  const [numSOL, setSOL] = useState(0);
  const [numUSDT, setUSDT] = useState(0);
  const [numXRP, setXRP] = useState(0);





  const [cryptosOwned, setCryptosOwned] = useState();
  const [numCryptosOwned, setNumCryptosOwned] = useState();
  const [purchaseAmount, setPurchaseAmount] = useState();
  const [dates, setDates] = useState();

  const [hasRun, setHasRun] = useState(false);

  const [balanceHasRun, setBalanceHasRun] = useState(false);


  async function setBalanceFunc() {

    let tempBalance = parseFloat(cash);
    if (cryptosOwned != undefined && cryptosOwned.length > 0 && numCryptosOwned != undefined && numCryptosOwned.length > 0 && cash != undefined) {
      setBalanceHasRun(true);
      for (let i = 0; i < cryptosOwned.length; i++) {

        switch(cryptosOwned[i]) {
          case "ADA":
            let val1 = await get("/api/ADArequest");

            tempBalance = tempBalance + val1.res2.body.result.ADAUSD.a[0] * numCryptosOwned[i].$numberDecimal; 
          break;
          case "BTC":
            let val2 = await get("/api/BTCrequest");

            tempBalance = tempBalance + val2.res2.body.result.XXBTZUSD.a[0] * numCryptosOwned[i].$numberDecimal; 
        
          break;
          case "DOGE":
            let val3 = await get("/api/DOGErequest");

            tempBalance = tempBalance + val3.res2.body.result.XDGUSD.a[0] * numCryptosOwned[i].$numberDecimal; 

          break;
          case "DOT":
            let val4 = await get("/api/DOTrequest");

            tempBalance = tempBalance + val4.res2.body.result.DOTUSD.a[0] * numCryptosOwned[i].$numberDecimal; 
          break;
          case "ETH":
            let val5 = await get("/api/ETHrequest");

            tempBalance = tempBalance + val5.res2.body.result.XETHZUSD.a[0] * numCryptosOwned[i].$numberDecimal; 

          break;
          case "MATIC":
            let val6 = await get("/api/MATICrequest");

            tempBalance = tempBalance + val6.res2.body.result.MATICUSD.a[0] * numCryptosOwned[i].$numberDecimal; 
        
        break;
        case "SOL":
          let val7 = await get("/api/SOLrequest");

          tempBalance = tempBalance + val7.res2.body.result.SOLUSD.a[0] * numCryptosOwned[i].$numberDecimal; 
        
        break;
        case "SHIB":
          let val8 = await get("/api/SHIBrequest");

          tempBalance = tempBalance + val8.res2.body.result.SHIBUSD.a[0] * numCryptosOwned[i].$numberDecimal;

        break;
        case "USDT":
          let val9 = await get("/api/USDTrequest");
          tempBalance = tempBalance + val9.res2.body.result.USDTZUSD.a[0] * numCryptosOwned[i].$numberDecimal;

        break;
        case "XRP":
          let val10 = await get("/api/XRPrequest");
          tempBalance = tempBalance + val10.res2.body.result.XXRPZUSD.a[0] * numCryptosOwned[i].$numberDecimal;
        break;
      }
      
    }
    setBalance(tempBalance);
    

  }
}

  
  const makeRequest = () => {

    if (!hasRun) {
      get(`/api/userCryptoRequest`, { googleid: user.googleid }).then((userObj) => {
        
        setHasRun(true);
        setBalance(userObj.balance.$numberDecimal);
        setCash(userObj.cash.$numberDecimal);
        setCryptosOwned(userObj.cryptosOwned);
        setNumCryptosOwned(userObj.numCryptosOwned);
        setDates(userObj.dates);
        setPurchaseAmount(userObj.valsAtPurchase);
        setBalanceFunc();
        
      }).catch(() => {
        
        post("/api/userCryptos", {
          name: user.name,
          googleid: user.googleid,
          balance: 100000.00,
          cash: 100000.00,
          numCryptosOwned: [],
          cryptosOwned: [],
          valsAtPurchase: [],
          dates: [],
        }).then((userObj) => {

          setHasRun(true);
          setBalance(parseFloat(userObj.body.balance.$numberDecimal));
          setCash(parseFloat(userObj.body.cash.$numberDecimal));
          setCryptosOwned(userObj.body.cryptosOwned);
          setNumCryptosOwned(userObj.body.numCryptosOwned);
          setPurchaseAmount(userObj.body.valsAtPurchase);
          setDates(userObj.body.dates);
          

          
        })
      }
      );
    }
  }


  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    
    if (user != undefined && hasRun == false) {
      makeRequest();
      
    }
    if (user != undefined && !balanceHasRun) {
      getCryptoNums();
      const intervalId = setInterval(() => {
        setBalanceFunc();
      },1000)

    }

        
  }, [user, numCryptosOwned, cryptosOwned, cash, dates, purchaseAmount]);

  const checkifListDefined = () => {
  if (cryptosOwned != undefined && cryptosOwned.length > 0) {
    return cryptosOwned.map((crypto) => <div>{crypto}</div>);
  }
  else {
    return (<div>Not available. </div>)
  }
  }

  const checkifListDefined2 = () => {
    if (numCryptosOwned != undefined && numCryptosOwned.length > 0) {
      return numCryptosOwned.map((crypto) => <div>{crypto.$numberDecimal}</div>);
    }
    else {
      return (<div>Not available. </div>)
    }
    }
  
    const checkifListDefined3 = () => {
      if (purchaseAmount != undefined && purchaseAmount.length > 0) {
        return purchaseAmount.map((crypto) => <div>${(Math.round(crypto.$numberDecimal * 100)/100).toFixed(2)}</div>);
      }
      else {
        return (<div>Not available. </div>)
      }
      }
  
  const checkifDatesDefined = () => {
      if (dates != undefined && dates.length > 0) {
        return dates.map((date) => <div>{date}</div>);
      }
      else {
        return (<div>Not available. </div>)
      }
  }

  const checkifBalanceDefined = () => {
    if (balance != undefined) {
      return (<div>Account Balance: ${(Math.round(100 * balance)/100).toFixed(2)} </div>);
    }
    else {
      return (<div>Account Balance: Not available. </div>);
    }

    
  }
  const checkifCashDefined = () => {
    if (cash != undefined) {
      return (<div>Cash Available: ${(Math.round(cash * 100)/100).toFixed(2)} </div>);
    }
    else {
      return (<div>Cash Available: Not available. </div>);
    }

    
  }
  
  const getCryptoNums = () => {
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
        setADA(ADAnum);
        setBTC(BTCnum);
        setDOT(DOTnum);
        setDOGE(DOGEnum);
        setETH(DOTnum);
        setMATIC(MATICnum);
        setSHIB(SHIBnum);
        setSOL(SOLnum);
        setUSDT(USDTnum);
        setXRP(XRPnum);

      }
    }
    
  }

  if (!user) {
    return (<div className="listContainer bodytext">
      <div> Loading!</div>  
    </div>);
  }
  return (
    
    <>
      <div className="listContainer bodytext">
        <div>{user.name}</div>
        {checkifBalanceDefined()}
        {checkifCashDefined()}
        <div>----------------</div>
        <div>TRANSACTION HISTORY: </div>
        <div className="u-flex u-flex-justifyCenter">
          
          <div className="u-block margin-num">
            <div>Date of Transaction: </div>
            {checkifDatesDefined()}
          </div>
          <div className="u-block margin-num">
            <div>Cryptos Owned: </div>
            {checkifListDefined()}
          </div>
          <div className="u-block margin-num">
            <div>Num: </div>
            {checkifListDefined2()}
          </div>
          <div className="u-block margin-num">
            <div>Total: </div>
            {checkifListDefined3()}
          </div>
        </div>
        <div>----------------</div>
        <div>CRYPTO OWNERSHIP: </div>
          <div>ADA: {numADA} </div>
          <div>BTC: {numBTC} </div>
          <div>DOGE: {numDOGE} </div>
          <div>DOT: {numDOT} </div>
          <div>ETH: {numETH} </div>
          <div>MATIC: {numMATIC} </div>
          <div>SHIB: {numSHIB} </div>
          <div>SOL: {numSOL} </div>
          <div>USDT: {numUSDT} </div>
          <div>XRP: {numXRP} </div>
      
        
      </div>
    </>
  );
};

export default Profile;
