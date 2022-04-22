import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveUserData,
  saveUserPassword,
  IMyData,
  IMyPassword,
} from "services/userApi";
import AuthError from "errors/authError";
import { useAlert } from "react-alert";

import UserContext from "context/UserContext";

const nameBlackList = {
  special: `\`!@#$%^&*()+=\[\]{};':"\\|,.<>\/?~`,
  directory: ["../", "./", "~/", "~"],
};

const useProfile = () => {
  const user = useContext(UserContext);
  const [firstName, setFirstName] = useState<string>(user?.firstName);
  const [lastName, setLastName] = useState<string>(user?.lastName);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const alert = useAlert();

  const handleFirstname = (value: string) => {
    setFirstName(value);
  };

  const handleLastName = (value: string) => {
    setLastName(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleConfirmPassword = (value: string) => {
    setConfirmPassword(value);
  };

  const validadeNameOrLastName = (name: string) => {
    const includesSpecials = nameBlackList.special
      .split("")
      .some((caractere) => name.includes(caractere));

    const includesDirectory = nameBlackList.directory.some((caractere) =>
      name.includes(caractere)
    );

    if (includesSpecials || includesDirectory) {
      setErrorMessage("O nome não podem conter caracteres especiais!");
      setErrors((errors) => [...errors, "firstName", "lastName"]);
      throw new Error();
    }
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      setErrorMessage("As senhas devem ter no mínimo 6 dígitos!");
      setErrors((errors) => [...errors, "password", "confirmPassword"]);
      throw new Error();
    }

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coencidem!");
      setErrors((errors) => [...errors, "password", "confirmPassword"]);
      throw new Error();
    }
  };

  const validateData = ({ firstName, lastName }: IMyData) => {
    setErrorMessage("");
    setErrors([]);
    validadeNameOrLastName(firstName);
    validadeNameOrLastName(lastName);
  };

  const validatePasswords = ({ password, confirmPassword }: IMyPassword) => {
    setErrorMessage("");
    setErrors([]);
    validatePassword(password, confirmPassword);
  };

  const handleSubmitData = async (data: IMyData) => {
    // const result = await saveUserData(data);
    // if (result === 409) throw new AuthError("Erro no cadastro!");
    // alert.success("Dados alterados com sucesso!");
    // navigate("/entrar");
  };

  const handleSubmitPassword = async (data: IMyPassword) => {
    // const result = await saveUserPassword(data);
    // if (result === 409) throw new AuthError("Erro no cadastro!");
    // alert.success("Dados alterados com sucesso!");
    // navigate("/entrar");
  };

  return {
    validateData,
    validatePasswords,
    handleSubmitData,
    handleSubmitPassword,
    errorMessage,
    errors,
    firstName,
    lastName,
    password,
    confirmPassword,
    setName: handleFirstname,
    setLastName: handleLastName,
    setPassword: handlePassword,
    setConfirmPassword: handleConfirmPassword,
  };
};

export default useProfile;
