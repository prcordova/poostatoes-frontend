import React from "react";
import { Container } from "./styles";

export default function Box({ children }) {
  return <Container className="container">{children}</Container>;
}
