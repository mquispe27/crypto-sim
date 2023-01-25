import React, { useState, useEffect } from "react";

import { get, post } from "../../utilities"

import "../../utilities.css";
import "./Leaderboard.css";

const Leaderboard = (props) => {

const INDICATORS = ["ADA", "BTC", "DOGE", "DOT", "ETH", "MATIC", "SHIB", "SOL", "USDT", "XRP"];

const [balanceList, setBalanceList] = useState([]);
const [userList, setUserList] = useState([]);
const [user, setUser] = useState();
const [sorted, setSorted] = useState(false);

var sortIds = require('sort-ids');
var reorder = require('array-rearrange');


async function LeaderboardStuff() {
    console.log("How many times this finna run?");
    let all_user_ids = await get("/api/leaderboardRequest");
    console.log(all_user_ids);

    for (const user_ of all_user_ids) {
        let info = await get("/api/userCryptoRequest", {googleid: user_});
        let cash = info.cash.$numberDecimal;
        let username = info.name;
        let cryptosOwned = info.cryptosOwned;
        let numCryptosOwned = info.numCryptosOwned;
        

        let tempBalance = parseFloat(cash);

    if (cryptosOwned != undefined && cryptosOwned.length > 0 && numCryptosOwned != undefined && numCryptosOwned.length > 0 && cash != undefined) {

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
        setBalanceList(balanceList => [ ...balanceList, tempBalance]);
        setUserList(userList => [...userList, username]);
    }
    
    }


}

function checkifUsersDefined() {
    if (userList != undefined) {
        return userList.map((user) => <div>{user}</div>);
    }
    else {
        return (<div>Not available.</div>);
    }
}

function checkifBalancesDefined() {
    if (balanceList != undefined ) {
        return balanceList.map((balance) => <div> ${(Math.round(100 * balance)/100).toFixed(2)}</div>);
    }
    else {
        return (<div>Not available.</div>);
    }
}

function sort() {

    /*if (balanceList != undefined && balanceList.length == 4 && userList.length == 4 && sorted == false) {
        
        
    }
    */
   console.log(balanceList);
   console.log(userList);
   if (sorted == false && balanceList != undefined && balanceList.length > 3 && userList != undefined && userList.length > 3) {
        /*
        var ids = sortIds(balanceList);
        console.log("Blame Pessi for this: ");
        console.log(reorder(balanceList, ids));
        console.log(reorder(userList, ids));

        //setBalanceList(reorder(balanceList, ids));
        //setUserList(reorder(userList, ids));
        setSorted(true);

        console.log("After: ");
        console.log(balanceList);
        console.log(userList);
        */
        let sorted_arr = balanceList.slice().sort(function(a, b){return b - a});
        console.log(sorted_arr);
        let users = [];
        for (let i = 0; i < balanceList.length; i++) {
            users = users.concat(userList[balanceList.indexOf(sorted_arr[i])]);
        }
        setUserList(users);
        setBalanceList(sorted_arr);
        setSorted(true);
   }

}


useEffect(() => {
    document.title = "Leaderboard";
    /*if (props.userId != "?") {
        get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
    }*/
    
    LeaderboardStuff();

        
  }, []);


    return (
        <>
            <h1 className = "text">Leaderboard</h1>
            <div className = "listContainer bodytext">
                <div className="u-flex u-flex-justifyCenter">
                    <div className="u-block margin-num">
                        {sort()}
                        <div>Name: </div>
                        {sorted ? checkifUsersDefined(): (<div></div>)}
                    </div>
                    <div className="u-block margin-num">
                        <div>Balance: </div>
                        {sorted ? checkifBalancesDefined() : (<div></div>)}
                            
                    </div>
                </div>
            </div>
        </>
    )
}

export default Leaderboard;