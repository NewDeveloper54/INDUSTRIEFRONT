import React, { useState, useEffect } from "react";
import "./Items.css";

const Planning = () => {
  const [error, setError] = useState("");
  const [plannings, setPlannings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://industrieback.onrender.com/api/plannings");
        const data = await res.json();
        setPlannings(data);
      } catch (error) {
        console.log("Erreur lors du chargement :" + error);
        setError("Erreur de chargement des plannings");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const resetForm = () => {
    setNewEvent({ title: "", date: "", time: "", description: "" });
    setEditMode(false);
    setEditId(null);
    setError("");
  };

  const handleAddEvent = () => {
    if (plannings.length >= 5 && !editMode) {
      setError("Vous ne pouvez pas ajouter plus de 5 événements.");
      return;
    }

    const url = editMode
      ? `https://industrieback.onrender.com/api/plannings/${editId}`
      : "https://industrieback.onrender.com/api/plannings";

    const method = editMode ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editMode) {
          setPlannings((prev) =>
            prev.map((p) => (p._id === editId ? data : p))
          );
        } else {
          setPlannings((prev) => [...prev, data]);
        }
        resetForm();
      })
      .catch((err) => {
        setError(`Erreur lors de l’enregistrement : ${err.message}`);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://industrieback.onrender.com/api/plannings/${id}`, { method: "DELETE" })
      .then(() => {
        setPlannings((prev) => prev.filter((p) => p._id !== id));
        setError("");
      })
      .catch(() => setError("Erreur lors de la suppression"));
  };

  const handleEdit = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description
    });
    setEditId(event._id);
    setEditMode(true);
    setError("");
  };

  return (
    <main className="planning-main">
      <section className="planning-header">
        <h1 className="planning-title">Planning</h1>
      </section>

      <section className="planning-form">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={newEvent.title}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newEvent.description}
          onChange={handleInputChange}
        />
        <div className="planning-form-buttons">
          <button onClick={handleAddEvent}>
            {editMode ? "Mettre à jour" : "Ajouter"}
          </button>
          {editMode && (
            <button onClick={resetForm} className="cancel-button">
              Annuler
            </button>
          )}
        </div>
        {error && <p className="planning-error">{error}</p>}
      </section>

      <section className="planning-card-list">
        {plannings.length === 0 ? (
          <p className="planning-empty">Aucun événement prévu.</p>
        ) : (
          plannings.map((event) => (
            <div key={event._id} className="planning-card">
              <h2 className="planning-card-title">{event.title}</h2>
              <p><strong className="strong">Date :</strong> {event.date}</p>
              <p><strong className="strong">Heure :</strong> {event.time}</p>
              <p><strong className="strong">Description :</strong> {event.description}</p>
              <div className="planning-card-buttons">
                <button className="planning-edit-btn" onClick={() => handleEdit(event)}>Modifier</button>
                <button className="planning-delete-btn" onClick={() => handleDelete(event._id)}>Supprimer</button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Planning;
