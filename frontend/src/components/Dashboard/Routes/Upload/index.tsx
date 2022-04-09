import Subheader from "components/Subheader";
import FileUploaderCustom from "components/Fileuploader";

import { Container, FileUploaderContainer } from "./styles";

import usefile from "validations/useFile";
import { useRef } from "react";

const Upload = () => {
  const { file, setFile, validadeFile, fileTypes, maxSize, errorMessage } =
    usefile();

  const inputRef = useRef<any>();

  const handleSelectFile = (file: any) => {
    try {
      validadeFile(file);
    } catch (error: any) {
      console.log("Um erro aqui: ", error.message);
    }
  };

  return (
    <Container>
      <Subheader title="Enviar arquivos" />
      <input
        ref={inputRef}
        className="invisible"
        type="file"
        onChange={({ target }) =>
          handleSelectFile(target && target.files && target.files[0])
        }
        value={file}
        accept=".pdf, .txt"
      />
      <FileUploaderContainer onClick={() => inputRef?.current?.click()}>
        <>
          <p className="text">Clique ou arraste seus documentos</p>
          <FileUploaderCustom file={file} />
          {!!errorMessage && <p>{errorMessage}</p>}
        </>
      </FileUploaderContainer>
      {!!errorMessage && <p>{errorMessage}</p>}
    </Container>
  );
};

export default Upload;
