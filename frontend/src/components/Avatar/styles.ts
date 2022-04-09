import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.header`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.textColor};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.backgroundDefault};
  cursor: pointer;
`;
