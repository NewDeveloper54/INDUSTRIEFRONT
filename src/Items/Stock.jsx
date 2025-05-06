import React,{useState, useEffect} from "react";
import stockk from "../assets/stock.jpg";


const Stock = () => {

const [stock, setStock]=  useState({});


useEffect(()=> {
    const fetchData = async ()=>{
        try{
            const response = await fetch ("http://localhost:5000/api/stocks");
const data = await response.json();
setStock(data);
        }catch(error){
            console.log("il y a une erreur dans le stock: "+error);
        }

    }
    fetchData();
}, []);


    return (
        <div id="Stock">
<div className="card">
          <img src={stockk} alt="" />
        <h1  className="angled-shadow">Stock</h1>
      </div>
        </div>
    )
};

export default Stock;
