import React, { useEffect, useState } from "react";
import "./Items.css";
import alertt from "../assets/alert.jpg";

const Alerte = () => {

const [alert, setAlert] =useState({});

useEffect(()=>{
  async function fetchData() {
    try{
      const response = await fetch ("http://localhost:5000/api/alertes");
      const data = await response.json();

      console.log(data);
      setAlert(data);

    }catch(error){
      console.log("il y a une erreur: "+error);
    }
    
  }
  fetchData();
}, []);


  return (
    <div id="Alerte">
      
<div className="card">
          <img src={alertt} alt="" />
        <h1  className="angled-shadow">Alertes et notifications</h1>
      </div>


      
    </div>
  );
};

export default Alerte;
