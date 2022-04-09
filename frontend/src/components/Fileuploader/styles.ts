import styled from "styled-components";
import { colors } from "styles/_global.style";

export const Container = styled.div`
  width: 80%;
  height: 70%;
  min-width: 300px;

  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%233C404380' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e");
  border-radius: 20px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

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
