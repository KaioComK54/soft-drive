import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
`;

export const Title = styled.p`
  color: ${colors.textColor};
  font-weight: 500;
  font-size: 20px;
`;

export const TabPanel = styled.div`
  width: 100%;
  height: 400px;
  padding: 16px 8px;

  .profile-container {
    width: 100%;
    height: 100%;
    display: flex;

    .profile-img {
      width: 250px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
    }

    .profile-data {
      flex: 1;
      align-self: center;

      .btn-container {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  @media (max-width: 1000px) {
    .profile-container {
      flex-direction: column;

      .profile-img {
        width: 100%;
        height: 100px;

        img {
          width: 70px;
          height: 70px;
        }
      }
    }
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
