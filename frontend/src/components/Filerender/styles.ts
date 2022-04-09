import styled from "styled-components";
import { colors } from "styles/_global.style";

export const FileBox = styled.div`
  width: 150px;
  height: 170px;

  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;

  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
  }

  p {
    margin-top: 16px;
    color: ${colors.textColor};
    font-weight: 400;
  }

  &:hover {
    background-color: ${colors.lightBlue};
  }
`;
