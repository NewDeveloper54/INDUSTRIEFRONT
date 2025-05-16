import React, { useState } from "react";
import "./Aside.css";

import planning from "../assets/planning.png";

const Aside = ({ onItemClick }) => {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (itemName) => {
    setActiveItem(itemName);
    onItemClick(itemName);
  };

  return (
    <div id="aside">
      <aside>
        <div
          onClick={() => handleClick("Tâches")}
          className={`item ${activeItem === "Tâches" ? "invert" : ""}`}
        >
          Gestion des tâches
        </div>
        <div
          onClick={() => handleClick("Planning")}
          className={`item ${activeItem === "Planning" ? "invert" : ""}`}
        >
          Planning
        </div>

 
        <div
          onClick={() => handleClick("Stock")}
          className={`item ${activeItem === "Stock" ? "invert" : ""}`}
        >
          Notifications et alertes
        </div>

        


        <div
          onClick={() => handleClick("Alerte")}
          className={`item ${activeItem === "Alerte" ? "invert" : ""}`}
        >
Tableau de bord
        </div>
      </aside>
    </div>
  );
};

export default Aside;
