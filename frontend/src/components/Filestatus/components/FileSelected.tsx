import PDFimg from "assets/pdf.jpg";
import TXTimg from "assets/txt.jpg";

import { Container } from "./styles";

interface props {
  file: File | any;
}

const FileSelected = ({ file }: props) => {
  const getSelectedFileImg = () => {
    if (file) {
      const { name } = file;

      const [_, type] = name.split(".");

      if (type === "pdf") return PDFimg;
      return TXTimg;
    }
  };

  const getSelectedFileName = () => {
    if (file) {
      const { name } = file;

      return name;
    }
  };

  return (
    <Container>
      <img alt="Adicionar imagem" src={getSelectedFileImg()} />
      <div className="guide-box">
        <p className="guide-title">Documento selecionado</p>
        <p className="guide-title">{getSelectedFileName()}</p>
      </div>
    </Container>
  );
};

export default FileSelected;
