import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

import SignUpForm from "../../Components/SignUpForm/SignUpForm";
import LoginForm from "../../Components/LoginForm/LoginForm";
import ForgotPassword from "../../Components/ForgotPassword/ForgotPassword";

import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  console.log(showForgotPassword);
  return (
    <main>
      <h1>AuthPage</h1>
      {showForgotPassword ? (
        <div>
          
        </div>
      ) : (
        ""
      )}
	  
      {showLogin & !showForgotPassword ? (<LoginForm setUser={setUser} />) 
	  	: !showLogin & showForgotPassword ? (<ForgotPassword />)
		: !showLogin & !showForgotPassword ? (<SignUpForm setUser={setUser} />)
		: null
      }
      <div>
        <Link to="/" onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "Create an Account" : "Already have an account?"}
        </Link>
        <br />
        <Link to="/" onClick={() => setShowForgotPassword(!showForgotPassword)}>
          {!showForgotPassword ? "Reset Password" : "Cancel"}
        </Link>
      </div>
      {/* &nbsp; | &nbsp; */}
    </main>
  );
}
