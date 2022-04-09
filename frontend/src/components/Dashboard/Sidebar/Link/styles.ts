import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props: { selected: any }) =>
    props.selected ? colors.lightBlue : "transparent"};

  .link {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    @media (max-width: 1000px) {
      flex-direction: column;
    }
  }

  img {
    width: 20px;
  }

  .label {
    font-weight: 400;
    font-size: 16px;
    color: ${colors.textColor};
    margin-left: 10px;

    @media (max-width: 1000px) {
      font-size: 14px;
    }
  }
`;
