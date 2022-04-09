import styled from "styled-components";
import { colors } from "styles/_global.style";

interface Props {
  size: "small" | "large";
}

const getLogoSize = (size: string) => {
  if (size === "small") return "40px";
  if (size === "large") return "80px";

  return "30px";
};

const getTextSize = (size: string) => {
  if (size === "small") return "20px";
  if (size === "large") return "35px";

  return "20px";
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .logo {
    width: ${(props: Props) => getLogoSize(props.size)};
  }

  .name {
    color: ${colors.textColor};
    margin-left: 5px;
    font-size: ${(props: Props) => getTextSize(props.size)};
    font-weight: 400;
  }
`;
