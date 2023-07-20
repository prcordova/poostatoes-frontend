import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;

  svg {
    width: 15px;
    height: 15px;
  }

  button {
    width: 100%;
    height: 25px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: #555;
    border: 0;
    color: #fff;
    border-radius: 5px;
  }
`;
