import { useState } from "react";
import { useAsync } from "react-async-hook";
import loginApi, { DataType } from "services/loginApi";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const useLogin = () => {
  const [errors, setErrors] = useState<string[]>([]);

  const removeErrorFromArray = (error: string) => {
    const index = errors.indexOf(error);
    index > -1 && setErrors(errors.slice(index, 1));
  };

  const validateEmail = (email: string) => {
    removeErrorFromArray("email");

    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) setErrors((errors) => [...errors, "email"]);
  };

  const validatePassword = (password: string) => {
    removeErrorFromArray("password");

    if (!password) {
      setErrors((errors) => [...errors, "password"]);
    }
  };

  const validateData = ({ email, password }: DataType) => {
    validateEmail(email);
    validatePassword(password);
  };

  const handleSubmit = (data: DataType) => {
    const request = useAsync(loginApi, [data]);
  };

  return {
    validateData,
    errors,
  };
};

export default useLogin;
