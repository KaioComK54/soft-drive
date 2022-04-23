import { useState, useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { sendUserFile, getAFile, deleteAFile } from "services/fileApi";

import UserFileContext from "context/UserFileContext";
import FileError from "errors/fileError";

const fileTypes = ["TXT", "PDF"];
const maxSize = 2; // In .MB

const fileErrorsMessage = {
  nameError: "O nome do arquivo é inválido",
  typeError: "O tipo do arquivo é inválido!",
  sizeError: "O arquivo fornecido é muito grande!",
};

const fileNameBlackList = {
  special: `\`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`,
  directory: ["../", "./", "~/", "~"],
};

const useFile = () => {
  const [file, setFile] = useState<any>();
  const alert = useAlert();
  const { fetchUserFilesRequest } = useContext(UserFileContext);

  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  }, [errorMessage]);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("file", file);

    const result = await sendUserFile(data);

    if (result.status === 422)
      throw new FileError("Limite de envio de arquivo excedido!");

    if (result.status >= 400) throw new FileError("Erro ao enviar o arquivo!");

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

    if (!fileName) {
      setErrorMessage(fileErrorsMessage.nameError);
      throw new Error();
    }

    const includesSpecials = fileNameBlackList.special
      .split("")
      .some((caractere) => fileName.includes(caractere));

    const includesDirectory = fileNameBlackList.directory.some((caractere) =>
      fileName.includes(caractere)
    );

    if (includesSpecials || includesDirectory) {
      setErrorMessage(fileErrorsMessage.nameError);
      throw new Error();
    }
  };

  const validateType = (file: File): never | any => {
    const { name } = file;

    const nameSplitted = name.split(".");

    const type = nameSplitted[nameSplitted.length - 1];

    if (!type) {
      setErrorMessage(fileErrorsMessage.typeError);
      throw new Error();
    }

    const isValidType = fileTypes.includes(type.toLocaleUpperCase());

    if (!isValidType) {
      setErrorMessage(fileErrorsMessage.typeError);
      throw new Error();
    }
  };

  const validateSize = (file: File): never | any => {
    const { size } = file;

    const isValidFileSize = size / 1000 / 1000 <= maxSize;

    if (!isValidFileSize) {
      setErrorMessage(fileErrorsMessage.sizeError);
      throw new Error();
    }
  };

  const validadeFile = (file: File) => {
    setErrorMessage("");
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
    errorMessage,
    handleSubmit,
    handleDownload,
    handleDelete,
  };
};

export default useFile;
