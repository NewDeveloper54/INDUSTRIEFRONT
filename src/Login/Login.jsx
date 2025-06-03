import React from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Ici tu peux ajouter ta logique d'authentification réelle

    onLogin(); // Informe App que l'utilisateur est connecté
    navigate("/"); // Redirige vers la page principale
  };

  return (
    <div id="Login">
      <div className="containerLogin">
        <h1 className="angled-shadowL">Login</h1>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <div style={{ width: "65%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          <button className="logBtn1" onClick={handleLogin}>
            Login
          </button>

          <Link to="/signup">
            <p className="pp">Don't have an account? Sign up!</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
