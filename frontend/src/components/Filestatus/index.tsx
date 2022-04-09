import React from "react";

import FileEmpty from "./components/FileEmpty";
import FileSelected from "./components/FileSelected";

import { Container, Title } from "./styles";

interface props {
  file: File | any;
}

const FileStatus = ({ file }: props) => {
  const getFileStatus = () => {
    if (!file) return <FileEmpty />;

    return <FileSelected file={file} />;
  };

  return (
    <React.Fragment>
      <Title>
        {!file ? "Clique e selecione seus documentos" : "Arquivo selecionado"}
      </Title>
      <Container>{getFileStatus()}</Container>
    </React.Fragment>
  );
};

export default FileStatus;
