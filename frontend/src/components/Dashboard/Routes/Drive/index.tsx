import React from "react";
import Subheader from "components/Subheader";
import Filerender from "components/Filerender";

import { Container, FileContainer } from "./styles";

const files = [
  {
    type: "txt",
    name: "Arquivo1.txt",
  },
  {
    type: "pdf",
    name: "Arquivo2.pdf",
  },
  {
    type: "txt",
    name: "Arquivo3.txt",
  },
  {
    type: "pdf",
    name: "Arquivo4.pdf",
  },
];

const Drive = () => {
  return (
    <Container>
      <Subheader title="Meu drive" />
      <FileContainer>
        {files.map((file) => (
          <Filerender key={file.name} file={file} />
        ))}
      </FileContainer>
    </Container>
  );
};

export default Drive;
