import React, { useContext, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import Logo from "../Logo";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    try {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then((response) => {
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function logout() {
    try {
      fetch("http://localhost:4000/logout", {
        credentials: "include",
        method: "POST",
      });
      setUserInfo(null);
    } catch (e) {
      console.log(e);
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <nav>
        {username && (
          <>
            <span>Hello, {username}</span>
            <Link to="/create">Create</Link>
            <Link to="/">
              <a onClick={logout}>Logout</a>
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
  );
}
