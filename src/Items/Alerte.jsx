import React, { useEffect, useState } from "react";
import "./Items.css";
import alertt from "../assets/alert.jpg";

const alertesLocales = [
  { id: 1, type: "stock", message: "⚠️ Stock faible pour Farine", niveau: "urgent" },
  { id: 2, type: "info", message: "📦 Nouvel article 'Beurre' ajouté au stock", niveau: "info" },
  { id: 3, type: "livraison", message: "🚚 Réception prévue aujourd’hui à 15h", niveau: "normal" }
];

const Alerte = () => {
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    // Ici on simule le fetch avec les données locales
    const timer = setTimeout(() => {
      setAlertes(alertesLocales);
    }, 800); // délai pour simuler un chargement

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="Alerte" className="alerte-container">
      

      <div className="alerte-list">
        {alertes.length === 0 ? (
          <p className="alerte-loading">Chargement des alertes...</p>
        ) : (
          
          alertes.map((alerte) => (
            <div key={alerte.id} className={`alerte-item ${alerte.niveau}`}>
              <span className="alerte-type">{alerte.type.toUpperCase()}</span>
              <p className="alerte-message">{alerte.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerte;
