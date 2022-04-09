import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${colors.secondaryLight};

  h3 {
    color: ${colors.textColor};
    font-weight: 400;
  }

  @media (max-width: 1000px) {
    height: 40px;

    h3 {
      font-size: 14px;
    }
  }
`;
