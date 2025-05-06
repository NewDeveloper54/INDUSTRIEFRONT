import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Aside from "./Aside/Aside";
import Main from "./Main/Main";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import "./App.css";


const App = () => {
  const [showContent, setShowContent] = useState("");

  const handleItemClick = (item) => {
    setShowContent(item);
  };

  return (
    <Router>
      <div className="main">

        <Routes>
          <Route path="/login" element={<Login />} /> {/* Page de Login seule */}

          <Route path="SignUp" element={<SignUp/>} />
          
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
