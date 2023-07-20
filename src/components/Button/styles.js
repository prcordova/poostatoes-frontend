import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    cursor: pointer;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #555;
    border: 0;
    color: #fff;
    height: 30px;

    border-radius: 5px;
    padding: 7px 0;
    font-size: 1.2rem;
  }
`;
