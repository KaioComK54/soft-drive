import Subheader from "components/Subheader";

import { Container, FileUploaderContainer } from "./styles";

import FileStatus from "components/Filestatus";
import ActionButtons from "./components/ActionButtons";

import usefile from "validations/useFile";
import useError from "validations/useError";
import { useRef } from "react";

const Upload = () => {
  const inputRef = useRef<any>();
  const { file, setFile, validadeFile } = usefile();

  const { validateError } = useError();

  const handleSelectFile = (file: any) => {
    try {
      validadeFile(file);

      setFile(file);
    } catch (error: any) {
      validateError(error);
    }
  };

  const handleSubmitFile = () => {};

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
        accept=".pdf, .txt"
      />
      <FileUploaderContainer
        onClick={() => !file && inputRef?.current?.click()}
      >
        <FileStatus file={file} />
        <ActionButtons
          file={file}
          setFile={setFile}
          submitFile={handleSubmitFile}
        />
      </FileUploaderContainer>
    </Container>
  );
};

export default Upload;
