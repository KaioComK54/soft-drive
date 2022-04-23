import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 80%;
  height: 70%;
  min-width: 300px;

  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%233C404380' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 20px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 90%;
  }
`;

export const Title = styled.h3`
  width: 80%;
  margin-bottom: 16px;
  text-align: left;
  color: ${colors.textColor};
  font-size: 20px;
  font-weight: 400;

  @media (max-width: 1000px) {
    padding: 8px;
    font-size: 15px;
    justify-content: center;
  }
`;

export const ErrorBox = styled.div`
  max-width: 400px;
  padding: 16px 8px;
  background-color: #f8a5c2;
  color: #d63031;
  border: 1px solid #d63031;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 16px;
  margin-top: 16px;
`;
