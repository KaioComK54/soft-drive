import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginApi, { DataType } from "services/loginApi";
import { setAuthToken, getAuthToken } from "utils/useAuth";
import AuthError from "errors/authError";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const validateEmail = (email: string) => {
    const emailIsValid = emailRegex.test(email);

    if (!emailIsValid) {
      setErrorMessage("Email inválido!");
      setErrors((errors) => [...errors, "email"]);
      throw new Error();
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setErrorMessage("A senha deve ter no mínimo 6 dígitos!");
      setErrors((errors) => [...errors, "password"]);
      throw new Error();
    }
  };

  const emptyFields = () => {
    if (email === "" || password === "") return true;
    return false;
  };

  const validateData = ({ email, password }: DataType) => {
    setErrorMessage("");
    setErrors([]);
    validateEmail(email);
    validatePassword(password);
  };

  const handleSubmit = async (data: DataType) => {
    const result = await loginApi(data);

    if (result === 401 || result === 400)
      throw new AuthError("Erro na autenticação!");

    await setAuthToken(result?.data?.accessToken);

    const token = getAuthToken();

    if (token) {
      navigate("/meu-drive");
    }
  };

  return {
    validateData,
    handleSubmit,
    errorMessage,
    errors,
    email,
    password,
    setEmail: handleEmail,
    setPassword: handlePassword,
    emptyFields,
  };
};

export default useLogin;
