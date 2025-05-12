import React, { useState } from "react";
import "./Items.css";

const Planning = () => {
  const [plannings, setPlannings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = () => {
    if (plannings.length >= 5) {
      setError("Vous ne pouvez pas ajouter plus de 5 événements.");
      return;
    }

    if (newEvent.title && newEvent.date && newEvent.time) {
      const newId = Date.now();
      setPlannings([...plannings, { id: newId, ...newEvent }]);
      setNewEvent({ title: "", date: "", time: "", description: "" });
      setError(""); 
    }
  };

  const handleDelete = (id) => {
    setPlannings(plannings.filter(event => event.id !== id));
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
        <button onClick={handleAddEvent}>Ajouter</button>
        {error && <p className="planning-error">{error}</p>}
      </section>

      <section className="planning-card-list">
        {plannings.length === 0 ? (
          <p className="planning-empty">Aucun événement prévu.</p>
        ) : (
          plannings.map((event) => (
            <div key={event.id} className="planning-card">
              <h2 className="planning-card-title">{event.title}</h2>
              <p><strong>Date :</strong> {event.date}</p>
              <p><strong>Heure :</strong> {event.time}</p>
              <p><strong>Description :</strong> {event.description}</p>
              <button className="planning-delete-btn" onClick={() => handleDelete(event.id)}>Supprimer</button>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Planning;
