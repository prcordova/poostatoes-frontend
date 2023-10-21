import React, { useState } from "react";
import Input from "../components/Input";
import Title from "../components/title/Title";
import Button from "../components/Button";
import Recaptcha from "../components/Recaptcha";
import Box from "../components/Box";
import { registerUser } from "../services/api";

export default function RegisterPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
  console.log(username);

  async function register(e) {
    e.preventDefault();

    try {
      const userData = {
        username,
        password,
      };

      const success = await registerUser(userData);

      if (success) {
        alert("sucesso");
      } else {
        alert("Register failed");
      }
    } catch (error) {
      alert("Register failed");
      console.log(error);
    }
  }

  return (
    <form onSubmit={register} className="register">
      <Title titleText="Register" />

      <Input
        label="Nome"
        type="text"
        placeholder="Nome"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Box>
        {/* <Recaptcha
          sitekey="Your client site key"
          value={recaptchaValue}
          onChange={setRecaptchaValue}
        /> */}
      </Box>
      <Button buttonText="Registrar" />
    </form>
  );
}
