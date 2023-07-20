import React from "react";
import { ContainerTitle } from "./styles";

export default function Title({ titleText }) {
  return (
    <ContainerTitle>
      <h1>{titleText}</h1>
    </ContainerTitle>
  );
}
