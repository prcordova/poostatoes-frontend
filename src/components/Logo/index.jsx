import React from "react";
import "./styles.css";
import logoImg from "../../assets/imgs/logo.png";

export default function Logo() {
  return (
    <div className="logo-container">
      <img src={logoImg} alt="logo postatoes" />
    </div>
  );
}
