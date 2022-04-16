import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginApi, { DataType } from "services/loginApi";
import { setAuthToken } from "utils/useAuth";
import AuthError from "errors/authError";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const removeErrorFromArray = (error: string) => {
    const index = errors.indexOf(error);
    index > -1 && setErrors(errors.slice(index, 1));
  };

  const validateEmail = (email: string) => {
    removeErrorFromArray("email");

    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) {
      setErrors((errors) => [...errors, "email"]);
      throw new Error();
    }
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

  const handleSubmit = async (data: DataType) => {
    const result = await loginApi(data);

    if (result === 401) throw new AuthError("Erro na autenticação!");

    setAuthToken(result?.data?.accessToken);
    navigate("/meu-drive");
  };

  return {
    validateData,
    handleSubmit,
    errors,
    email,
    password,
    setEmail: handleEmail,
    setPassword: handlePassword,
  };
};

export default useLogin;
