import styled from "styled-components";
import { colors } from "styles/_global.style";

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  .logo-container {
    margin-bottom: 24px;

    h4 {
      width: 100%;
      text-align: center;
      margin-top: 16px;
      color: ${colors.textColor};
      font-weight: 400;
      font-size: 18px;
    }
  }
`;

export const LoginBox = styled.div`
  width: 400px;
  height: 400px;

  padding: 16px 8px;

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  @media (max-width: 1000px) {
    width: 90%;
    height: 300px;
  }
`;

export const Button = styled.button`
  border: none;
  font-size: 14px;
  border-radius: 8px;
  font-weight: 600;
  background-color: transparent;
  color: ${colors.primaryLight};
  cursor: pointer;

  &.primary {
    background-color: ${colors.primaryDark};
    color: ${colors.backgroundDefault};
    border: none;
    padding: 12px 36px;
  }

  :hover {
    opacity: 0.7;
  }

  :disabled {
    background-color: #ccc;
    color: #333;
    cursor: auto;
    opacity: 1;
  }
`;

export const ErrorBox = styled.div`
  width: 100%;
  padding: 16px 8px;
  background-color: #f8a5c2;
  color: #d63031;
  border: 1px solid #d63031;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
`;
