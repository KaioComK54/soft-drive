import React from "react";

import pdfImage from "assets/pdf.jpg";
import txtImage from "assets/txt.jpg";

import { FileBox } from "./styles";

interface Props {
  file: {
    type: string;
    name: string;
  };
}

const Filerender = ({ file }: Props) => {
  const selectFileTypeIcon = (type: string) => {
    if (type === "pdf") return pdfImage;
    if (type === "txt") return txtImage;
  };

  const fileImage = selectFileTypeIcon(file.type);

  return (
    <FileBox>
      <img src={fileImage} alt="Icone do arquivo" />
      <p>{file.name}</p>
    </FileBox>
  );
};

export default Filerender;
