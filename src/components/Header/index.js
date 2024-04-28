import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Logo from "../Logo";
import { API_BASE_URL } from "../../services/api";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const username = userInfo?.username;

  useEffect(() => {
    try {
      const userInfo = localStorage.getItem("session");
      if (userInfo) {
        setUserInfo(JSON.parse(userInfo));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  // useEffect(() => {
  //   try {
  //     fetch(`${API_BASE_URL}/profile`, {
  //       credentials: "include",
  //     }).then((response) => {
  //       response.json().then((data) => {
  //         setUserInfo(data);
  //         localStorage.setItem("userInfo", JSON.stringify(data.token));
  //       });
  //     });
  //   } catch (e) {
  //     console.log("Err:", e);
  //   }
  // }, []);

  function logout() {
    try {
      fetch(`${API_BASE_URL}/logout`, {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
      localStorage.removeItem("session");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <header>
        <Link to="/" className="logo">
          <Logo />
        </Link>

        <nav>
          {username && (
            <>
              <span>Hello, {username}</span>

              <Link to="/create">Novo post</Link>
              <Link to="/">
                <a onClick={logout}>Sair</a>
              </Link>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
