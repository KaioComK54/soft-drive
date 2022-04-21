import addFile from "assets/add-file.png";

import { Container } from "./styles";

const FileEmpty = () => {
  return (
    <Container>
      <img alt="Adicionar imagem" src={addFile} />
      <div className="guide-box">
        <p className="guide-title">Selecione seu documento</p>
        <p className="guide-item">* Suporta somente PDF e TXT</p>
        <p className="guide-item">
          * O tamanho do arquivo deve ser no máximo 2 MB.
        </p>
        <p className="guide-item">
          * O nome do arquivo não deve ter caracteres especiais.
        </p>
      </div>
    </Container>
  );
};

export default FileEmpty;
