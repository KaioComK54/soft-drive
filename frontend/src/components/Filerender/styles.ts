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

  button {
    width: 150px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
  }

  img {
    width: 100px;
    height: 100px;
  }

  p {
    margin-top: 16px;
    color: ${colors.textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: ${colors.lightBlue};
  }
`;
