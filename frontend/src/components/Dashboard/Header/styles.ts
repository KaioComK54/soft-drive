import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.header`
  grid-area: header;

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 999;
  padding: 0px 16px;

  background-color: ${colors.backgroundDefault};
  border-bottom: 1px solid ${colors.secondaryLight};
`;
