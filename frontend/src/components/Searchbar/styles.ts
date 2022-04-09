import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 550px;
  height: 35px;
  background-color: ${colors.secondaryDark};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px;

  img {
    width: 25px;
  }

  input {
    outline: 0;
    width: 100%;
    height: 35px;
    border: none;
    background-color: transparent;
    padding-left: 10px;
    font-size: 18px;
    font-weight: 300;
    color: ${colors.textColor};
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;
