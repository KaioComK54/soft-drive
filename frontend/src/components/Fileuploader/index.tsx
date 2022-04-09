import React from "react";
import Subheader from "components/Subheader";

import addFile from "assets/add-file.png";

import { Container } from "./styles";

interface props {
  file: any;
}

const Fileuploader = ({ file }: props) => {
  return (
    <Container>
      <img alt="Adicionar imagem" src={addFile} />
      <div className="guide-box">
        <p className="guide-title">Selecione seus documentos</p>
        <p className="guide-item">* Suporta somente PDF e TXT</p>
        <p className="guide-item">
          * O tamanho do arquivo de ser inferior a 2 MB
        </p>
      </div>
    </Container>
  );
};

export default Fileuploader;
