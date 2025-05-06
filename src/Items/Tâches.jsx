import React, { useState } from "react";
import "./Items.css";

const Taches = () => {
  const [taches, setTaches] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [erreur, setErreur] = useState("");


  const handleAjouter = () => {
    if (!nom || !description) return;

    if (editIndex === null && taches.length >= 5) {
      setErreur("Limite de tâches atteinte!");
      return;
    }

    const nouvelleTache = { nom, description };

    if (editIndex !== null) {
      const updated = [...taches];
      updated[editIndex] = nouvelleTache;
      setTaches(updated);
      setEditIndex(null);
      setErreur(""); // ici on reinitialise l'erreur
    } else {
      setTaches([...taches, nouvelleTache]);
      setErreur(""); 
    }

    setNom("");
    setDescription("");
  };

  const handleSupprimer = (index) => {
    const updated = [...taches];
    updated.splice(index, 1);
    setTaches(updated);
    setErreur(""); // Enlève le message d'erreur si suppression
  };

  const handleModifier = (index) => {
    const tache = taches[index];
    setNom(tache.nom);
    setDescription(tache.description);
    setEditIndex(index);
    setErreur(""); // Réinitialise l'erreur
  };

  return (
    <div className="taches-container">
      <h1 className="taches-title">Gestion des Tâches</h1>

      <div className="taches-form">
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="taches-input"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="taches-input"
        />
        <button onClick={handleAjouter} className="taches-button">
          {editIndex !== null ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>

      {/* Message d'erreur */}
      {erreur && <p className="taches-erreur">{erreur}</p>}

      <table className="taches-table">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.length > 0 ? (
            taches.map((tache, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tache.nom}</td>
                <td>{tache.description}</td>
                <td className="action">
                  <button
                    className="taches-action-button"
                    onClick={() => handleModifier(index)}
                  >
                    Modifier
                  </button>
                  <button
                    className="taches-action-button taches-delete"
                    onClick={() => handleSupprimer(index)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucune tâche enregistrée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Taches;


