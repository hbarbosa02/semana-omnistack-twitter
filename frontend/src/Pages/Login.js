import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";

import twitterLogo from "../twitter.svg";
import "./Login.css";

export default function Login() {
  const history = useHistory();

  const [username, setUsername] = useState("");

  const disabledSubmit = useMemo(() => !username.length, [username]);

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("@GoTwitter:username", username);

    history.push("/timeline");
  }

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="GoTwitter" />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome do usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={disabledSubmit}>
          Entrar
        </button>
      </form>
    </div>
  );
}
