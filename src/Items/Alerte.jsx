import React, { useEffect, useState } from "react";
import "./Items.css"; // contient aussi le CSS du loader

const Dashboard = () => {
  const [nombreTaches, setNombreTaches] = useState(0);
  const [nombrePlannings, setNombrePlannings] = useState(0);
  const [nombreAlertes, setNombreAlertes] = useState(0);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tachesRes, planningsRes, alertesRes] = await Promise.all([
          fetch("https://industrieback.onrender.com/api/taches"),
          fetch("https://industrieback.onrender.com/api/plannings"),
          fetch("https://industrieback.onrender.com/api/alertes"),
        ]);

        const [taches, plannings, alertes] = await Promise.all([
          tachesRes.json(),
          planningsRes.json(),
          alertesRes.json(),
        ]);

        setNombreTaches(taches.length);
        setNombrePlannings(plannings.length);
        setNombreAlertes(alertes.length);
      } catch (error) {
        console.log("Erreur lors du chargement :", error);
      } finally {
        // Attente de 2 secondes avant de désactiver le loader
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loader" style={{transform:"translateX(-10px)"}}>
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
    <div className="dashboard-container">
      <h2 className="dashboard-title">Tableau de bord</h2>
      <div className="dashboard-cards">
        
        



        <div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave tache"></div>
  <div class="wave tache"></div>
  <div class="wave tache"></div>
  

      <div class="infotop">
      <h2 className="dashboard-title" style={{color:"white", fontSize:"60px"}}>{nombreTaches}</h2>

  Tâches
<div class="name">Mes tâches à faire</div>
  </div>
</div>

        <div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave planning"></div>
  <div class="wave planning"></div>
  <div class="wave planning"></div>
  

      <div class="infotop">
      <h2 className="dashboard-title" style={{color:"white", fontSize:"60px"}}>{nombrePlannings}</h2>

  Plannings
<div class="name">Mes plannings
</div>
  </div>
</div>
        

<div class="e-card playing">
  <div class="image"></div>
  
  <div class="wave alerte"></div>
  <div class="wave alerte"></div>
  <div class="wave alerte"></div>
  

      <div class="infotop">
      <h2 className="dashboard-title" style={{color:"white", fontSize:"60px"}}>{nombreAlertes}</h2>

  Alertes
<div class="name">Mes alertes et notificatins</div>
  </div>
</div>

        
      </div>
    </div>
  );
};

export default Dashboard;
