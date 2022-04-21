import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.header`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;
