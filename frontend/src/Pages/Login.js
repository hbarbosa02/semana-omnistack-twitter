import React from "react";

import twitterLogo from "../twitter.svg";
import "./Login.css";

export default function Pages() {
  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="GoTwitter" />
      <form>
        <input placeholder="Nome do usuário" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
