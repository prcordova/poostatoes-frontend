import { styled } from "styled-components";

export const ContainerInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  label {
    font-size: 1rem;
    background-color: white;
    width: fit-content;
    margin-bottom: 0.5rem;
  }

  input {
    display: block;
    margin-bottom: 1rem;
    width: 100%;
    padding: 5px 7px;
    border: 2px solid #ddd;
    background-color: #fff;
    border-radius: 5px;
  }
`;
