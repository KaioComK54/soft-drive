import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const FileContainer = styled.div`
  width: 100%;
  height: calc(100vh - (48px + 56px));
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;

  @media (max-width: 1000px) {
    padding: 8px;
    grid-gap: 0px;
    height: calc(100vh - (40px + 48px + 56px));
    justify-content: center;
  }
`;

export const EmptyFiles = styled.h5`
  font-size: 18px;
  font-weight: 400;
  color: ${colors.textColor};

  ::after {
    content: "Você ainda não enviou nenhum arquivo!";
  }
`;
