import React, { useState } from "react";
import "./Aside.css";

const Aside = ({onItemClick}) => {




    return(
        <div id="aside">
  

  <aside>


            <div onClick={()=> onItemClick("Tâches")} className="item" >Gestion des tâches</div>
            <div onClick={()=> onItemClick("Planning")} className="item" >Planning</div>
            <div onClick={()=> onItemClick("Stock")} className="item" >stocks</div>
            <div onClick={()=> onItemClick("Alerte")} className="item" >Notifications et alertes</div>
    
  </aside>


        </div>
    );
};

export default Aside;