import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Title from "../components/title/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import Box from "../components/Box";
import Recaptcha from "../components/Recaptcha";
import { loginUser } from "../services/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();

    try {
      const userInfo = await loginUser(username, password);

      setUserInfo(userInfo);
      if (userInfo) {
        localStorage.setItem("session", JSON.stringify(userInfo));
      }

      setRedirect(true);
    } catch (error) {
      alert("wrong credentials");
      console.error(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={login} className="login">
      <Title titleText="Login" />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button buttonText="Entrar" />
    </form>
  );
}
