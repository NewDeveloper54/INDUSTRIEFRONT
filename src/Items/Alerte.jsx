import React, { useEffect, useState } from "react";
import "./Items.css";

const Dashboard = () => {
  const [nombreTaches, setNombreTaches] = useState(0);
  const [nombrePlannings, setNombrePlannings] = useState(0);
  const [nombreAlertes, setNombreAlertes] = useState(0);

  useEffect(()=>{

    setTimeout(()=>{

      const fetchDataTaches = async()=>{
      try{
        const res = await fetch("https://industrieback.onrender.com/api/taches");
        const data = await res.json();
        setNombreTaches(data.length);

      }catch(error){
console.log("il ya eu une erreur :", error);
      }
    }


     async function fetchDataPlanning(){
      try{
        const res= await fetch("https://industrieback.onrender.com/api/plannings");
        const data = await res.json();
        setNombrePlannings(data.length);

      }catch(error){
        console.log("il ya eu une erreur :", error);
      }
     }

async function fetchDataAlertes() {
  try{
    const res = await fetch ("https://industrieback.onrender.com/api/alertes");
    const data = await res.json();
    setNombreAlertes(data.length);

  }catch(error){
    console.log("erreru :" + error);
  }
}

    fetchDataAlertes();
    fetchDataTaches();
    fetchDataPlanning();
    }, 1000);

    

  }, []);

  

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Tableau de bord</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card taches">
          <h3>Tâches</h3>
          <p>{nombreTaches}</p>
        </div>
        <div className="dashboard-card plannings">
          <h3>Plannings</h3>
          <p>{nombrePlannings}</p>
        </div>
        <div className="dashboard-card alertes">
          <h3>Alertes</h3>
          <p>{nombreAlertes}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
