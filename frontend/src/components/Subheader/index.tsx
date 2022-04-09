import React from "react";

import { Container } from "./styles";

interface Props {
  title: string;
}

const Subheader = ({ title }: Props) => {
  return (
    <Container>
      <h3>{title}</h3>
    </Container>
  );
};

export default Subheader;
