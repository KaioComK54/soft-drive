import { useEffect, useState } from "react";
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

const useFileMethods = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [fetchUserFiles, fetchUserFilesRequest] = useAsyncFn(getUserFiles);

  useEffect(() => {
    fetchUserFilesRequest();
  }, []);

  useEffect(() => {
    if (fetchUserFiles.loading) return;

    if (fetchUserFiles.value?.data) {
      setFiles(fetchUserFiles.value?.data);
    }
  }, [fetchUserFiles]);

  return {
    files,
    loading: fetchUserFiles.loading,
  };
};

export default useFileMethods;
