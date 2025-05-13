import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  // État pour gérer le thème
  const [theme, setTheme] = useState("light");

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Appliquer la classe CSS au <body>
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div id="navbar" className="navbar">
      <div className="frameNav">
        <Link to="/Login">
          <div className="login">
            <h2 >login</h2>
          </div>
        </Link>

        <div className="switchNav">
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme} // Remplace onClick par onChange (bonne pratique)
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
