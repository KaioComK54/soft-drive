import React from "react";

import pdfImage from "assets/pdf.jpg";
import txtImage from "assets/txt.jpg";

import { FileBox } from "./styles";

interface FileType {
  id: string;
  userId: string;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  file: FileType;
}

const Filerender = ({ file }: Props) => {
  const selectFileTypeIcon = (type: string) => {
    if (type === "application/pdf") return pdfImage;
    if (type === "text/plain") return txtImage;
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
