import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 131px;
  }

  .guide-box {
    margin-left: 16px;
    color: ${colors.textColor};
    font-weight: 400;
  }

  .guide-title {
    margin-bottom: 20px;
    font-size: 18px;
  }

  .guide-item {
    margin-bottom: 8px;
    font-size: 16px;
  }
`;
