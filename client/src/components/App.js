import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";
import $ from 'jquery';




import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Profile from "./pages/Profile.js";
import Dashboard from "./pages/Dashboard.js";
import Leaderboard from "./pages/Leaderboard.js";

import Header from "./modules/Header.js";


import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */



const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [googleId, setGoogleId] = useState("?");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setGoogleId(user.googleid);
      }
    });
  }, [googleId]);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
    
      
      <Header
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      />
      
  
      <Router className="body">
        <Skeleton path="/" handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
        <Profile path="/profile/:userId"  userId={userId} />
        <Dashboard path="/dashboard/" userId={userId} googleid = {googleId} />
        <Leaderboard path ="/leaderboard/" userId = {userId}/>
        <NotFound default />
      </Router>
      
    </>
  );
};

export default App;
