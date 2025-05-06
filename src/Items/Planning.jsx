import React, {useState, useEffect} from "react";
import planningg from "../assets/planning.jpg";


const Planning = () => {
const [planning, setPlanning] = useState({});


useEffect(() => {
    const fetchData = async ()=> {
        try{
            const response = await fetch ("http://localhost:5000/api/plannings");
            const data = await response.json();
            setPlanning(data);
        }catch(error){
            console.log("il y a une erreur: "+erreur)
        }
    }

    fetchData();
}, []);

    return (
        <div id="Planning">
<div className="card">
          <img src={planningg} alt="" />
        <h1  className="angled-shadow">Planning</h1>
      </div>
        </div>
    )
};

export default Planning;
