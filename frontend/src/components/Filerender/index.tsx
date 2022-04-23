import { useState } from "react";
import pdfImage from "assets/pdf.jpg";
import txtImage from "assets/txt.jpg";
import Tooltip from "@mui/material/Tooltip";

import { FileBox } from "./styles";

import Options from "./components/Options";

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
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const selectFileTypeIcon = (type: string) => {
    if (type === "application/pdf") return pdfImage;
    if (type === "text/plain") return txtImage;
  };

  const fileImage = selectFileTypeIcon(file.type);

  return (
    <FileBox>
      <button onClick={handleOpen}>
        <img src={fileImage} alt="Icone do arquivo" />
        <Tooltip title={file.name}>
          <p>{file.name}</p>
        </Tooltip>
      </button>
      <Options
        open={Boolean(anchor)}
        close={handleClose}
        fileId={file.id}
        reference={anchor}
      />
    </FileBox>
  );
};

export default Filerender;
