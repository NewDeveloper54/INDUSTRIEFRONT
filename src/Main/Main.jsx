import React from "react";
import "./Main.css";
import Tâches from "../Items/Tâches"; 
import Planning from "../Items/Planning";
import Stock from "../Items/Stock";
import Alerte from "../Items/Alerte";


const Main = ({showContent}) => {
    return (
        <div id="Main">
        <main className="scrollable-content ">
            <section>
                {showContent === "Tâches" && <Tâches/>}
                {showContent === "Planning" && <Planning/>}
                {showContent === "Stock" && <Stock/>}   
                {showContent === "Alerte" && <Alerte/>}
                 
                      </section>
                      
        </main>
        
        </div>
    );
};

export default Main;