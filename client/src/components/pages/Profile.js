import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities";

import "../../utilities.css";
import "./Profile.css";



const Profile = (props) => {
  //const [catHappiness, setCatHappiness] = useState(0);
  const [user, setUser] = useState();
  
  const [balance, setBalance] = useState(0);
  const [cash, setCash] = useState(0);

  const [cryptosOwned, setCryptosOwned] = useState();
  const [numCryptosOwned, setNumCryptosOwned] = useState();

  const [hasRun, setHasRun] = useState(false);

  const [balanceHasRun, setBalanceHasRun] = useState(false);


  async function setBalanceFunc() {
    let tempBalance = parseFloat(cash);
    if (cryptosOwned != undefined && cryptosOwned.length > 0 && numCryptosOwned != undefined && numCryptosOwned.length > 0 && cash != undefined) {
      console.log(tempBalance);
      for (let i = 0; i < cryptosOwned.length; i++) {

        switch(cryptosOwned[i]) {
          case "ADA":
            get("/api/ADArequest").then((crypto_data) => {
    
              tempBalance += ((crypto_data.res2.body.result.ADAUSD.a[0]) * numCryptosOwned[i]);
            })
          
          break;
          case "BTC":
            get("/api/BTCrequest").then((crypto_data) => {
              
              tempBalance += ((crypto_data.res2.body.result.XXBTZUSD.a[0]) * numCryptosOwned[i]);
              
          })
        
          break;
          case "DOGE":
            get("/api/DOGErequest").then((crypto_data) => {
              tempBalance += ((crypto_data.res2.body.result.XDGUSD.a[0]) * numCryptosOwned[i]); 
          })
          break;
          case "DOT":
            get("/api/DOTrequest").then((crypto_data) => {

              tempBalance += ((crypto_data.res2.body.result.DOTUSD.a[0]) * numCryptosOwned[i]); 
              
          })
          break;
          case "ETH":
            get("/api/ETHrequest").then((crypto_data) => {
    
              tempBalance += ((crypto_data.res2.body.result.XETHZUSD.a[0]) * numCryptosOwned[i]); 
          })
          break;
          case "MATIC":
            get("/api/MATICrequest").then((crypto_data) => {

              tempBalance += ((crypto_data.res2.body.result.MATICUSD.a[0]) * numCryptosOwned[i]); 
              console.log("We got MATIC.");
              
        })
        break;
        case "SOL":
            let val = await get("/api/SOLrequest");

            tempBalance = tempBalance + val.res2.body.result.SOLUSD.a[0] * numCryptosOwned[i].$numberDecimal; 
        
        break;
        case "SHIB":
          let val2 = await get("/api/SHIBrequest");

          tempBalance = tempBalance + val2.res2.body.result.SHIBUSD.a[0] * numCryptosOwned[i].$numberDecimal;
          console.log(val2.res2.body.result.SHIBUSD.a[0] * numCryptosOwned[i].$numberDecimal);
          console.log(tempBalance);
        break;
        case "USDT":
            get("/api/USDTrequest").then((crypto_data) => {

              tempBalance += ((crypto_data.res2.body.result.USDTZUSD.a[0]) * numCryptosOwned[i]); 
              
        })
        break;
        case "XRP":
            get("/api/XRPrequest").then((crypto_data) => {
              tempBalance += ((crypto_data.res2.body.result.XXRPZUSD.a[0]) * numCryptosOwned[i]); 
              
        })
        break;
      }
    }
    console.log(tempBalance);
    setBalance(tempBalance);
    setBalanceHasRun(true);

  }
}

  
  const makeRequest = () => {

    if (!hasRun) {
      get(`/api/userCryptoRequest`, { googleid: user.googleid }).then((userObj) => {
        

        
        setCash(userObj.cash.$numberDecimal);
        setCryptosOwned(userObj.cryptosOwned);
        setNumCryptosOwned(userObj.numCryptosOwned);
        setBalanceFunc();
        setHasRun(true);
      }).catch(() => {
        
        post("/api/userCryptos", {
          name: user.name,
          googleid: user.googleid,
          balance: 100000.00,
          cash: 100000.00,
          numCryptosOwned: [],
          cryptosOwned: [],
          valsAtPurchase: [],
        }).then((userObj) => {
          
          setBalance(parseFloat(userObj.body.balance.$numberDecimal));
          setCash(parseFloat(userObj.body.cash.$numberDecimal));
          setCryptosOwned(userObj.body.cryptosOwned);
          setNumCryptosOwned(userObj.body.numCryptosOwned);
          setHasRun(true);

          
        })
      }
      );
    }
  }


  useEffect(() => {
    document.title = "Profile Page";
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    
    if (user != undefined) {
      makeRequest();
      if (!balanceHasRun) 
        setBalanceFunc();
    }
  }, [user, numCryptosOwned, cryptosOwned, cash]);

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

  const checkifBalanceDefined = () => {
    if (balance != undefined) {
      return (<div>Account Balance: ${balance} </div>);
    }
    else {
      return (<div>Account Balance: Not available. </div>);
    }

    
  }
  const checkifCashDefined = () => {
    if (cash != undefined) {
      return (<div>Cash Available: ${cash} </div>);
    }
    else {
      return (<div>Cash Available: Not available. </div>);
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
        <div className="u-flex u-flex-justifyCenter">
          <div className="u-block margin-num">
            <div>Cryptos Owned: </div>
            {checkifListDefined()}
          </div>
          <div className="u-block margin-num">
            <div>Num: </div>
            {checkifListDefined2()}
          </div>
        </div>
      
        
      </div>
    </>
  );
};

export default Profile;
