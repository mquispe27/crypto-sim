/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const request = require('request');



const INDICATORS = ["ADA", "BTC", "DOGE", "DOT", "ETH", "MATIC", "SHIB", "SOL", "USDT", "XRP"];

// import models so we can interact with the database
const User = require("./models/user");
const UserCryptos = require("./models/userCryptos");
const League = require("./models/league");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});



router.post("/userCryptos",auth.ensureLoggedIn, (req, res) => {
  const newUserCryptos = new UserCryptos({
    name: req.body.name,
    googleid: req.body.googleid,
    balance: req.body.balance,
    cash: req.body.cash,
    numCryptosOwned: req.body.numCryptosOwned,
    cryptosOwned: req.body.cryptosOwned,
    valsAtPurchase: req.body.valsAtPurchase,
    dates: req.body.dates
});

  newUserCryptos.save().then((userCryptoData) => res.send(userCryptoData));
});

router.post("/transactionUpdateRequest",auth.ensureLoggedIn, (req, res) => {

  console.log("WHY");
  UserCryptos.updateMany({googleid: req.body.googleid}, {
    $inc: {cash: -req.body.cash}, $push: {numCryptosOwned: req.body.numCryptosOwned, cryptosOwned: req.body.cryptosOwned, valsAtPurchase: req.body.valsAtPurchase, dates: req.body.dates}
  }).then((userCryptoData) => res.send(userCryptoData));

 
});
//$inc: {cash: -req.body.cash}, $push: {numCryptosOwned: req.body.numCryptosOwned}
router.get("/userCryptoRequest", (req, res) => {
  UserCryptos.findOne({googleid: req.query.googleid}).then((userCryptoData) => res.send(userCryptoData));
});

router.get("/leaderboardRequest", (req, res) => {
  User.distinct("googleid").then(userList => res.send(userList));
});



router.get("/leaguesRequest", auth.ensureLoggedIn, (req, res) => {
  League.findOne({code: req.query.code}).then((leagueFound) => res.send(leagueFound));
});

router.post("/joinRequest", auth.ensureLoggedIn, (req, res) => {
  League.updateOne({code: req.body.code}, {
    
    $push: {users: req.body.users}
  }).then((output) => res.send(output));
});

router.post("/leaveRequest", auth.ensureLoggedIn, (req, res) => {
  League.updateOne({code: req.body.code}, {
    
    $pull: {users: req.body.users}
  }).then((output) => res.send(output));
});

router.post("/createLeagueRequest", auth.ensureLoggedIn, (req, res) => {
  const newLeague = new League({
    name: req.body.name,
    code: req.body.code,
    creator: req.body.creator,
    users: req.body.users
  });
  newLeague.save().then((data) => res.send(data));
  
});

router.get("/belongRequest", auth.ensureLoggedIn, (req, res) => {

  League.find({users: req.query.users} ).then((output) => {console.log(output); res.send(output);});

});



  router.get("/ADArequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=ADAUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/ADAlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=ADAUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });
  
  router.get("/BTCrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=BTCUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/BTClast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=BTCUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/DOGErequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=DOGEUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/DOGElast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=DOGEUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/DOTrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=DOTUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });
  router.get("/DOTlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=DOTUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/ETHrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=ETHUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/ETHlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=ETHUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/MATICrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=MATICUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/MATIClast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=MATICUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/SHIBrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=SHIBUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/SHIBlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=SHIBUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/SOLrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=SOLUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });
  router.get("/SOLlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=SOLUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/USDTrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=USDTUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });
  router.get("/USDTlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=USDTUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/XRPrequest", (req, res) => {
    
    request('https://api.kraken.com/0/public/Ticker?pair=XRPUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });

  router.get("/XRPlast12request", (req, res) => {
    
    request('https://api.kraken.com/0/public/OHLC?pair=XRPUSD', { json: true }, (err, res2, body) => {
    if (err) { return console.log(err); }
    console.log(body.url);
    console.log(body.explanation);
    res.send({res2, body});
    });
  });


// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
