import React, { createContext, useEffect, useState } from "react";
import { useAsyncFn } from "react-use";
import { getUserFiles } from "services/fileApi";

interface FileType {
  id: string;
  userId: string;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserFileContext {
  files: FileType[] | [];
  fetchUserFilesRequest: Function;
  loading: boolean;
}

const initial = {
  files: [],
  fetchUserFilesRequest: () => {},
  loading: false,
};

const UserFileContext = createContext<IUserFileContext>(initial);

const UserFileContexProvider: React.FC = ({ children }) => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [fetchUserFiles, fetchUserFilesRequest] = useAsyncFn(getUserFiles);

  useEffect(() => {
    if (fetchUserFiles.loading) return;

    if (fetchUserFiles.value?.data) {
      setFiles(fetchUserFiles.value?.data);
    }
  }, [fetchUserFiles]);

  return (
    <UserFileContext.Provider
      value={{
        files,
        fetchUserFilesRequest,
        loading: fetchUserFiles.loading,
      }}
    >
      {children}
    </UserFileContext.Provider>
  );
};

export { UserFileContexProvider };
export default UserFileContext;
