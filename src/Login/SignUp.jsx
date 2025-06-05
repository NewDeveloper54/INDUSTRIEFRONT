import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    // ici pour les fetch tu chnagera l'url par celle de ton backend, met ca dans ton backend http://localhost:8080 pour les fetch puis qund ca marche tu mettera sur render 

    const res = await fetch("https://magnificent-manifestation-production.up.railway.app/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, email, password }),
    });

    if (res.ok) {
      alert("Compte créé avec succès !");
      navigate("/login");
    } else if (res.status === 409) {
      alert("L'email déjà utilisé.");
    } else {
      alert("il y a une erreur lors de l'inscription.");
    }
  };

  return (
  <div id="SignUp">
    <div className="containerLoginSignup">
      <h1 className="angled-shadowL">Signup</h1>

      <form className="SIgnupForm" onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div
          style={{
            width: "350px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop:"50px",
            marginLeft:"-50px"
          }}
        >
          <button className="logBtn2" type="submit">
            SignUp
          </button>

          <Link to="/login">
            <p className="pp">Already have an account? Login!</p>
          </Link>
        </div>
      </form>
      <div className="line yiwen"></div>
      <div className="line sin"></div>
      <div className="line tlata"></div>
    </div>
  </div>
);

};

export default SignUp;
