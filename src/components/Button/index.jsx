import React from "react";
import { Container } from "./styles";

export default function Button({ buttonText, ...props }) {
  return (
    <Container>
      <button>{buttonText}</button>
    </Container>
  );
}
