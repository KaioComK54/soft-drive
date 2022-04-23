import React from "react";

import FileEmpty from "./components/FileEmpty";
import FileSelected from "./components/FileSelected";

import { Container, Title, ErrorBox } from "./styles";

interface props {
  file: File | any;
  hasError: string;
}

const FileStatus = ({ file, hasError }: props) => {
  const getFileStatus = () => {
    if (!file) return <FileEmpty />;

    return <FileSelected file={file} />;
  };

  return (
    <React.Fragment>
      <Title>
        {!file ? "Clique e selecione seus documentos" : "Arquivo selecionado"}
      </Title>
      <Container>
        {getFileStatus()}
        {hasError && <ErrorBox>{hasError}</ErrorBox>}
      </Container>
    </React.Fragment>
  );
};

export default FileStatus;
