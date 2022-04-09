import React from "react";
import { Container } from "./styles";

import lock from "assets/lock.png";

interface Props {
  size: "small" | "large";
}

const Logo = ({ size }: Props) => {
  return (
    <Container size={size}>
      <img className="logo" src={lock} alt="Logo do site, um cadeado" />
      <h1 className="name">SoftDrive</h1>
    </Container>
  );
};

export default Logo;
