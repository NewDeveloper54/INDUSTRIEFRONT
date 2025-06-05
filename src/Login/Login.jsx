import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // ici pour les fetch tu chnagera l'url par celle de ton backend, met ca dans ton backend http://localhost:8080 pour les fetch puis qund ca marche tu mettera sur render 

    const res = await fetch("https://magnificent-manifestation-production.up.railway.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // Optionnel : récupérer le token ou données utilisateur
      // const data = await res.json();

      onLogin(); // informe que l'utilisateur est connecté
      navigate("/"); // redirige vers la page d'accueil
    } else {
      alert("Login failed !");
    }
  };

  return (
    <div id="Login">
      <div className="containerLogin">
        <h1 className="angled-shadowL">Login</h1>

        <form className="LoginForm" onSubmit={handleLogin}>
            <div className="inputs">

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

            </div>
          

          <div
            style={{
              width: "350px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <button className="logBtn1" type="submit">
              Login
            </button>

            <Link to="/signup">
              <p className="pp">Don't have an account? Sign up!</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
