import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { loginAPI } from "../../API";

export default function SignIn({ setToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(loginAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
      } else {
        setToken(result.token);
        localStorage.setItem("token", result.token);
        setSuccessMessage(result.message);
        alert("You've been successfuly signed in");
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred while logging in.");
    }
  }
  return (
    <div className="login-div">
      <h1 className="login-title">Login</h1>
      {error && <p>{error}</p>}
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <label>
            Username:{" "}
            <input
              type="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:{" "}
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="login-button-div">
            <button className="login-button">Sign In</button>
          </div>
        </form>
      </div>
      <p className="register">
        Don't have an account? <br />
        <Link to="/Register">Register Now!</Link>
      </p>
    </div>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};
