import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault();
        window.location.href = "/App"; 
    };

    return (
        <div id="Login">
            <div className="containerLogin">
                <h1 className="angled-shadowL">Login</h1>


                



                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />

                <div style={{ width: "65%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    
                    {/* Bouton qui recharge vers App */}
                    <button className="logBtn1" onClick={handleLogin}>
                        Login
                    </button>

                    {/* Lien pour aller vers SignUp sans recharger */}
                    <Link to="/SignUp">
                        <p className="pp">Don't have an account? Sign up!</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
