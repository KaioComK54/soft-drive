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

  .text {
    width: 80%;
    margin-bottom: 16px;
    text-align: left;
    color: ${colors.textColor};
    font-size: 20px;
    font-weight: 400;
  }

  @media (max-width: 1000px) {
    padding: 8px;
    grid-gap: 0px;
    height: calc(100vh - (40px + 48px + 56px));
    justify-content: center;

    .text {
      font-size: 15px;
      text-align: center;
    }
  }
`;