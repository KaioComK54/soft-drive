import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 16px;
  padding: 8px;

  img {
    height: 131px;

    @media (max-width: 1000px) {
      height: 100px;
    }
  }

  .guide-box {
    margin-left: 16px;
    color: ${colors.textColor};
    font-weight: 400;
  }

  .guide-title {
    margin-bottom: 20px;
    font-size: 18px;

    @media (max-width: 1000px) {
      font-size: 15px;
    }
  }

  .guide-item {
    margin-bottom: 8px;
    font-size: 16px;

    @media (max-width: 1000px) {
      font-size: 14px;
    }
  }

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;
