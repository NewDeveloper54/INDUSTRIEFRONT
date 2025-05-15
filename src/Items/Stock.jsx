import React, { useState, useEffect } from "react";
import "./Items.css";

const Alerte = () => {
  const [alertes, setAlertes] = useState([]);
  const [message, setMessage] = useState("");
  const [niveau, setNiveau] = useState("info");
  const [type, setType] = useState("general");
  const [error, setError] = useState(null);

  // Charger les données depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/alertes");
        const data = await res.json();
        setAlertes(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setError("Erreur de chargement des alertes");
      }
    };

    fetchData(); // N'oublie pas d'appeler la fonction
  }, []);

  // Ajouter une alerte
  const ajouterAlerte = async () => {
    if (!message) return;

    const nouvelleAlerte = {
      message,
      niveau,
      type,
      date: new Date().toISOString(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/alertes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouvelleAlerte),
      });

      const newAlerte = await res.json();
      setAlertes((prev) => [newAlerte, ...prev]);
      setMessage("");
    } catch (err) {
      console.error("Erreur lors de l’ajout :", err);
      setError("Erreur lors de l’ajout de l’alerte");
    }
  };

  // Supprimer une alerte
  const supprimerAlerte = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/alertes/${id}`, {
        method: "DELETE",
      });
      setAlertes((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="alertes-dashboard">
      <h2 className="title">📢 Alertes</h2>

      <div className="alerte-form">
        <input
          type="text"
          placeholder="Message de l'alerte..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <select value={niveau} onChange={(e) => setNiveau(e.target.value)}>
          <option value="info">Info</option>
          <option value="urgent">Urgent</option>
        </select>
        <button onClick={ajouterAlerte}>Ajouter</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="alerte-liste">
        {alertes.length === 0 ? (
          <p className="aucune">Aucune alerte pour l'instant.</p>
        ) : (
          alertes.map((alerte) => (
            <div key={alerte._id} className={`alerte-carte ${alerte.niveau}`}>
              <div className="alerte-header">
                <span className="alerte-type">{alerte.type.toUpperCase()}</span>
                <span className="alerte-date">
                  {new Date(alerte.date).toLocaleString()}
                </span>
              </div>
              <p className="alerte-message">{alerte.message}</p>
              <button
                onClick={() => supprimerAlerte(alerte._id)}
                className="supprimer-btn"
              >
                ✖ Supprimer
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerte;
