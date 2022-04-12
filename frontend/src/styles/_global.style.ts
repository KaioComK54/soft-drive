import styled, { createGlobalStyle } from "styled-components";
import "./_font.css";

export const colors = {
  backgroundDefault: "#FEFEFF",
  textColor: "#3C4043",
  primaryLight: "#4688F4",
  primaryDark: "#3D6EC9",
  secondaryLight: "#DADDE1",
  secondaryDark: "#F0F2F4",
  lightBlue: "#E9F1FE",
  success: "#2ecc71",
  error: "#e74c3c",
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${colors.backgroundDefault};

  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 48px 1fr;

  overflow: hidden;

  @media (max-width: 1000px) {
    grid-template-areas:
      "header"
      "content"
      "sidebar";
    grid-template-columns: 1fr;
    grid-template-rows: 48px 1fr 48px;
  }
`;
