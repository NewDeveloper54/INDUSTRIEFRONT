import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const SignUp = () => {

    const handleSignUp = (e) => {
        e.preventDefault();
        window.location.href = "/"; // Force aussi un rechargement vers App
    };

    return (
        <div id="SignUp">
            <div className="containerLoginSignup">
                <h1 className="angled-shadowL">Signup</h1>

                <div className="line one"></div>
                <div className="line two"></div>

                <input type="text" placeholder="Full Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm password" />

                <div style={{ width: "65%", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                    
                    {/* Bouton qui recharge vers App */}
                    <button className="logBtn2" onClick={handleSignUp}>
                        SignUp
                    </button>

                    {/* Lien pour retourner vers Login sans reload */}
                    <Link to="/Login">
                        <p className="pp">Already have an account? Login!</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
