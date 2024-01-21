import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersAPI } from "../../API";

export default function Register({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(usersAPI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstname, lastname }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
      } else {
        setToken(result.token);
        navigate("/SignIn");
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className="register-div">
      <h1 className="register-title">Register</h1>
      {error && <p>{error}</p>}
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <label>
            First Name:{" "}
            <input
              className="register-input"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name:{" "}
            <input
              className="register-input"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email:{" "}
            <input
              className="register-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:{" "}
            <input
              className="register-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="register-button-div">
            <button className="register-button">Submit</button>
          </div>
        </form>
      </div>
      <p className="have-account">
        Have and Account? <br />
        <Link to="/SignIn">Sign In</Link>
      </p>
    </div>
  );
}
