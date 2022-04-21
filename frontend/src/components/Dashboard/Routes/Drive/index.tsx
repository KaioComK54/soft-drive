import Subheader from "components/Subheader";
import Filerender from "components/Filerender";

import { Container, FileContainer, EmptyFiles } from "./styles";
import Loader from "components/Loader";

import useFileMethods from "./hooks/useFileMethods";

const Drive = () => {
  const { files, loading } = useFileMethods();

  return (
    <Container>
      <Subheader title="Meu drive" />

      <FileContainer>
        {loading ? (
          <Loader />
        ) : files.length ? (
          files.map((file) => <Filerender key={file.id} file={file} />)
        ) : (
          <EmptyFiles />
        )}
      </FileContainer>
    </Container>
  );
};

export default Drive;
