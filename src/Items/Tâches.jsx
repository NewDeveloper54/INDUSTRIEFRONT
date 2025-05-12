import React, { useState, useEffect } from "react";
import "./Items.css";

const Taches = () => {
  const [taches, setTaches] = useState([]);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [erreur, setErreur] = useState("");

  // Charger les tâches depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/api/taches")
      .then((res) => res.json())
      .then((data) => setTaches(data))
      .catch((err) => {
        console.error("Erreur de chargement :", err);
        setErreur("Erreur de chargement des tâches");
      });
  }, []);

  const handleAjouter = () => {
    if (!nom || !description) return;

    if (editId === null && taches.length >= 5) {
      setErreur("Limite de tâches atteinte !");
      return;
    }

    const tache = { nom, description };

    if (editId !== null) {
      // Modification
      fetch(`http://localhost:5000/api/taches/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tache),
      })
        .then((res) => res.json())
        .then((updatedTache) => {
          setTaches((prev) =>
            prev.map((t) => (t.id === editId ? updatedTache : t))
          );
          resetForm();
        })
        .catch(() => setErreur("Erreur lors de la mise à jour"));
    } else {
      // Création
      fetch("http://localhost:5000/api/taches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tache),
      })
        .then((res) => res.json())
        .then((newTache) => {
          setTaches((prev) => [...prev, newTache]);
          resetForm();
        })
        .catch((err) => {
          setErreur("Erreur lors de l’ajout");
          console.error("Erreur lors de l’ajout :", err);
        });
    }
  };

  const handleSupprimer = (id) => {
    fetch(`http://localhost:5000/api/taches/${id}`, { method: "DELETE" })
      .then(() => {
        setTaches((prev) => prev.filter((t) => t.id !== id));
        setErreur("");
      })
      .catch(() => setErreur("Erreur lors de la suppression"));
  };

  const handleModifier = (tache) => {
    setNom(tache.nom);
    setDescription(tache.description);
    setEditId(tache.id);
    setErreur("");
  };

  const resetForm = () => {
    setNom("");
    setDescription("");
    setEditId(null);
    setErreur("");
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
          {editId !== null ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>

      {erreur && <p className="taches-erreur">{erreur}</p>}

      <table className="taches-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.length > 0 ? (
            taches.map((tache, index) => (
              <tr key={tache.id}>
                <td>{index + 1}</td>
                <td>{tache.nom}</td>
                <td>{tache.description}</td>
                <td className="action">
                  <button
                    className="taches-action-button"
                    onClick={() => handleModifier(tache)}
                  >
                    Modifier
                  </button>
                  <button
                    className="taches-action-button taches-delete"
                    onClick={() => handleSupprimer(tache.id)}
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
