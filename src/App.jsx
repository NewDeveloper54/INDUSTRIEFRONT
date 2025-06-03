import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import "./App.css";

const App = () => {
  const [showContent, setShowContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader déclenché après login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion

  const handleItemClick = (item) => {
    setShowContent(item);
  };

  const handleLogin = () => {
    setIsLoading(true);   // Affiche loader
    // Simule un délai de chargement (ex: 2 sec)
    setTimeout(() => {
      setIsLoading(false); // Cache loader
      setIsLoggedIn(true); // Passe à la page principale
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="loader" style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        height: "100vh"
      }}>
        <div className="box box-1"><div className="side-left" /><div className="side-right" /><div className="side-top" /></div>
        <div className="box box-2"><div className="side-left" /><div className="side-right" /><div className="side-top" /></div>
        <div className="box box-3"><div className="side-left" /><div className="side-right" /><div className="side-top" /></div>
        <div className="box box-4"><div className="side-left" /><div className="side-right" /><div className="side-top" /></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="*"
            element={
              isLoggedIn ? (
                <>
                  <NavBar />
                  <div className="container">
                    <Aside onItemClick={handleItemClick} />
                    <Main showContent={showContent} />
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
