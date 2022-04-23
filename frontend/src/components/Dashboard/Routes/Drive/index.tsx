import { useContext, useEffect } from "react";
import Subheader from "components/Subheader";
import Filerender from "components/Filerender";

import { Container, FileContainer, EmptyFiles } from "./styles";
import Loader from "components/Loader";

import UserFileContext from "context/UserFileContext";

const Drive = () => {
  const { files, loading, fetchUserFilesRequest } = useContext(UserFileContext);

  useEffect(() => {
    fetchUserFilesRequest();
  }, []);

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
