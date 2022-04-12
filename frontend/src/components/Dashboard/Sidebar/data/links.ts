import drive from "assets/drive.png";
import upload from "assets/upload.png";

import driveSelected from "assets/drive-active.png";
import uploadSelected from "assets/upload-active.png";

const links = [
  {
    icon: drive,
    iconSelected: driveSelected,
    label: "Meus documentos",
    url: "/meu-drive",
  },
  {
    icon: upload,
    iconSelected: uploadSelected,
    label: "Enviar documentos",
    url: "/upload",
  },
];

export default links;
