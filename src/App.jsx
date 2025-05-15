import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import "./App.css";

const App = () => {
  const [showContent, setShowContent] = useState("");
  const [isLoading, setIsLoading] = useState(true); // État pour le loader

  const handleItemClick = (item) => {
    setShowContent(item);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cache le loader après 2 secondes
    }, 2000);

    return () => clearTimeout(timer); // Nettoyage
  }, []);

  if (isLoading) {
    return (
<div className="loader" style={{display:"flex", justifyContent:"center", alignItems:"center", border: "solid 2px green", height:"100vh"}}>
        <div className="box box-1">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-2">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-3">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
        <div className="box box-4">
          <div className="side-left"></div>
          <div className="side-right"></div>
          <div className="side-top"></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <>
                <NavBar />
                <div className="container">
                  <Aside onItemClick={handleItemClick} />
                  <Main showContent={showContent} />
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
