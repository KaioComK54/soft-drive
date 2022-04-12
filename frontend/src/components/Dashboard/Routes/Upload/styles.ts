import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .invisible {
    display: none;
  }
`;

export const FileUploaderContainer = styled.div`
  width: 100%;
  height: calc(100vh - (48px + 56px));
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  .buttons {
    width: 80%;
    display: flex;
    justify-content: end;
    margin-top: 10px;

    button {
      padding: 8px 16px;
      margin-left: 10px;
      border: none;
      font-size: 18px;
      border-radius: 8px;
      font-weight: 500;
      background-color: transparent;
      color: ${colors.primaryLight};
      border: 1px solid ${colors.primaryLight};
      cursor: pointer;

      &.primary {
        background-color: ${colors.primaryDark};
        color: ${colors.backgroundDefault};
        border: none;
      }

      :hover {
        opacity: 0.7;
      }
    }
  }

  @media (max-width: 1000px) {
    padding: 8px;
    grid-gap: 0px;
    height: calc(100vh - (40px + 48px + 56px));
    justify-content: center;
  }
`;
