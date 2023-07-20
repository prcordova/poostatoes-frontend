import React from "react";
import { ContainerInput } from "./styles";

export default function Input({
  type,
  placeholder,
  value,
  onChange,
  label,
  ...props
}) {
  return (
    <ContainerInput>
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </ContainerInput>
  );
}
