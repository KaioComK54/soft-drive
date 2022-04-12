import { useState, useEffect } from "react";
import FileError from "errors/fileError";
import { useAlert } from "react-alert";

const useError = () => {
  const alert = useAlert();

  const validateError = (error: any) => {
    if (error instanceof FileError) {
      alert.error(error.message);
    }
  };

  return {
    validateError,
  };
};

export default useError;
