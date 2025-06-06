import React, { useState, useEffect } from "react";
import "./Items.css";

const Alerte = () => {
  const [alertes, setAlertes] = useState([]);
  const [message, setMessage] = useState("");
  const [niveau, setNiveau] = useState("info");
  const [type, setType] = useState("general");
  const [error, setError] = useState(null);
  const [editionId, setEditionId] = useState(null);
  const [editionMessage, setEditionMessage] = useState("");
  const [editionNiveau, setEditionNiveau] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://industrieback.onrender.com/api/alertes");
        const data = await res.json();
        setAlertes(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setError("Erreur de chargement des alertes");
      }
    };

    fetchData();
  }, []);

  const ajouterAlerte = async () => {
    if (!message) return;

    const nouvelleAlerte = {
      message,
      niveau,
      type,
      date: new Date().toISOString(),
    };

          // ici pour les fetch tu chnagera l'url par celle de ton backend, met ca dans ton backend http://localhost:5000/api/alertes pour les fetch puis qund ca marche tu mettera sur render pour le mettre enligne 


    try {
      const res = await fetch("https://industrieback.onrender.com/api/alertes", {
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

  const supprimerAlerte = async (id) => {
    try {
      await fetch(`https://industrieback.onrender.com/api/alertes/${id}`, {
        method: "DELETE",
      });
      setAlertes((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const activerEdition = (alerte) => {
    setEditionId(alerte._id);
    setEditionMessage(alerte.message);
    setEditionNiveau(alerte.niveau);
  };

  const annulerEdition = () => {
    setEditionId(null);
    setEditionMessage("");
    setEditionNiveau("");
  };

  const enregistrerModification = async (id) => {
    try {
      const res = await fetch(`https://industrieback.onrender.com/api/alertes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: editionMessage, niveau: editionNiveau }),
      });

      const updatedAlerte = await res.json();

      setAlertes((prev) =>
        prev.map((a) => (a._id === id ? { ...a, ...updatedAlerte } : a))
      );

      annulerEdition();
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      setError("Erreur lors de la modification");
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
        <button onClick={ajouterAlerte}  style={{cursor:"pointer"}}>Ajouter</button>
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

              {editionId === alerte._id ? (
                <div className="edition-form">
                  <input
                  style={{backgroundColor: editionNiveau === "info" ? "#d1e7dd" : "#f8d7da", color:"rgb(98, 95, 95)"}}
                    type="text"
                    value={editionMessage}
                    onChange={(e) => setEditionMessage(e.target.value)}
                  />
                  <select
                  style={{backgroundColor
: editionNiveau === "info" ? "#d1e7dd" : "#f8d7da", marginLeft: "10px", marginRight: "10px"
                  }}
                    value={editionNiveau}
                    onChange={(e) => setEditionNiveau(e.target.value)}
                  >
                    <option value="info">Info</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <button onClick={() => enregistrerModification(alerte._id)}  style={{cursor:"pointer"}}> Enregistrer</button>
                  <button onClick={annulerEdition} style={{ marginLeft: "5px", cursor:"pointer"}}>❌ Annuler</button>
                </div>
              ) : (
                <>
                  <p className="alerte-message" style={{ fontWeight: "bold", paddingBottom: "5px" }}>
                    {alerte.message}
                  </p>
                  <button onClick={() => activerEdition(alerte)} className="modifier-btn">✏ Modifier</button>
                  <button
                    onClick={() => supprimerAlerte(alerte._id)}
                    className="supprimer-btn"
                  >
                    ✖ Supprimer
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alerte;
