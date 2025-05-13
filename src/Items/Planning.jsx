import React, { useState, useEffect } from "react";
import "./Items.css";

const Planning = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [plannings, setPlannings] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/plannings");
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

  const handleAddEvent = () => {
    if (plannings.length >= 5) {
      setError("Vous ne pouvez pas ajouter plus de 5 événements.");
      return;
    }

    const planning = { ...newEvent }; // Utilisation de newEvent directement

    fetch("http://localhost:5000/api/plannings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(planning),
    })
      .then((res) => res.json())
      .then((newPlanning) => {
        setPlannings((prev) => [...prev, newPlanning]);
        setNewEvent({
          title: "",
          date: "",
          time: "",
          description: ""
        }); // Reset form
      })
      .catch((err) => {
        setError(`Erreur lors de l’ajout: ${err.message}`);
        console.error("Erreur lors de l’ajout :", err);
      });
  };

  const handleDelete = (id) => {
  fetch(`http://localhost:5000/api/plannings/${id}`, { method: "DELETE" })
    .then(() => {
      setPlannings((prev) => prev.filter((p) => p._id !== id)); // Correction ici
      setError("");
    })
    .catch(() => setError("Erreur lors de la suppression"));
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
            <div key={event._id} className="planning-card">
              <h2 className="planning-card-title">{event.title}</h2>
              <p><strong>Date :</strong> {event.date}</p>
              <p><strong>Heure :</strong> {event.time}</p>
              <p><strong>Description :</strong> {event.description}</p>
              <button className="planning-delete-btn" onClick={() => handleDelete(event._id)}>Supprimer</button>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Planning;
