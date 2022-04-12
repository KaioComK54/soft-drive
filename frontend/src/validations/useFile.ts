import { useState } from "react";

import FileError from "errors/fileError";

const fileTypes = ["TXT", "PDF"];
const maxSize = 2; // In .MB

const fileErrorsMessage = {
  nameError: "O nome do arquivo é inválido",
  typeError: "O tipo do arquivo é inválido!",
  sizeError: "O tamanho do arquivo é inválido!",
};

const fileNameBlackList = {
  special: `\`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`,
  directory: ["../", "./", "~/", "~"],
};

const useFile = () => {
  const [file, setFile] = useState();

  const validateName = (file: File): never | any => {
    const { name } = file;

    const [fileName] = name.split(".");

    if (!fileName) throw new FileError(fileErrorsMessage.nameError);

    const specialCaracteres = fileNameBlackList.special;
    const directorySnnipets = fileNameBlackList.directory;

    const includesSpecials = specialCaracteres
      .split("")
      .some((caractere) => fileName.includes(caractere));

    const includesDirectory = directorySnnipets.some((caractere) =>
      fileName.includes(caractere)
    );

    if (includesSpecials || includesDirectory)
      throw new FileError(fileErrorsMessage.nameError);
  };

  const validateType = (file: File): never | any => {
    const { name } = file;

    const [_, type] = name.split(".");

    if (!type) throw new FileError(fileErrorsMessage.typeError);

    const isValidType = fileTypes.includes(type.toLocaleUpperCase());

    if (!isValidType) throw new FileError(fileErrorsMessage.typeError);
  };

  const validateSize = (file: File): never | any => {
    const { size } = file;

    const isValidFileSize = size / 1000 / 1000 <= maxSize;

    if (!isValidFileSize) throw new FileError(fileErrorsMessage.sizeError);
  };

  const validadeFile = (file: File) => {
    validateName(file);
    validateType(file);
    validateSize(file);
  };

  return {
    file,
    setFile,
    validadeFile,
    fileTypes,
    maxSize,
  };
};

export default useFile;
