import { useState } from "react";
import { useAlert } from "react-alert";
import { sendUserFile, getAFile, deleteAFile } from "services/fileApi";
import useFileMethods from "components/Dashboard/Routes/Drive/hooks/useFileMethods";

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
  const [file, setFile] = useState<any>();
  const alert = useAlert();
  const { fetchUserFilesRequest } = useFileMethods();

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", file);

    const result = await sendUserFile(data);

    if (result instanceof Error)
      throw new FileError("Erro ao enviar o arquivo!");

    setFile(null);
    alert.success("Arquivo enviado com sucesso!");
  };

  const handleDownload = async (id: string) => await getAFile(id);

  const handleDelete = async (id: string) => {
    await deleteAFile(id);
    fetchUserFilesRequest();
  };

  const validateName = (file: File): never | any => {
    const { name } = file;

    const [fileName] = name.split(".");

    if (!fileName) throw new FileError(fileErrorsMessage.nameError);

    const includesSpecials = fileNameBlackList.special
      .split("")
      .some((caractere) => fileName.includes(caractere));

    const includesDirectory = fileNameBlackList.directory.some((caractere) =>
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
    handleSubmit,
    handleDownload,
    handleDelete,
  };
};

export default useFile;
