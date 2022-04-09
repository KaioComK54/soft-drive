import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.aside`
  grid-area: sidebar;

  padding: 8px 0px;

  background-color: ${colors.backgroundDefault};
  border-right: 1px solid ${colors.secondaryLight};

  @media (max-width: 1000px) {
    border-top: 1px solid ${colors.secondaryLight};
    display: flex;
    flex-direction: row;
    padding: 0;
  }
`;
