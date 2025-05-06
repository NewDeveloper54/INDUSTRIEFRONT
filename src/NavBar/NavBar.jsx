import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  // État pour gérer le thème jour/nuit
  const [theme, setTheme] = useState("light");

  // Fonction pour changer le thème
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.style.background = theme === "light"
      ? "linear-gradient(45deg,rgb(47, 53, 164),rgb(138, 185, 205))"
      : "linear-gradient(45deg, #1c1c1c,rgb(160, 155, 155))";
  }, [theme]);
 
  

  return (
    <div id="navbar" className={`navbar`}>
      <div className={`frameNav`}>
        <Link to="/Login">
          <div className="login">
            <h2 style={{ color: "white", fontWeight: "bold" }}>login</h2>
          </div>
        </Link>

        <div className="switchNav">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}  // Lié à l'état `theme`
              onClick={toggleTheme}     // Fonction qui change le thème
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
