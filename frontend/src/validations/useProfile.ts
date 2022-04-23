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
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

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
    setOldPassword(value);
  };

  const handleConfirmPassword = (value: string) => {
    setNewPassword(value);
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

  const validatePassword = (oldPassword: string, newPassword: string) => {
    if (oldPassword.length < 6 || newPassword.length < 6) {
      setErrorMessage("As senhas devem ter no mínimo 6 dígitos!");
      setErrors((errors) => [...errors, "oldPassword", "newPassword"]);
      throw new Error();
    }
  };

  const validateData = ({ firstName, lastName }: IMyData) => {
    setErrorMessage("");
    setErrors([]);
    validadeNameOrLastName(firstName);
    validadeNameOrLastName(lastName);
  };

  const validatePasswords = ({ oldPassword, newPassword }: IMyPassword) => {
    setErrorMessage("");
    setErrors([]);
    validatePassword(oldPassword, newPassword);
  };

  const handleSubmitData = async (data: IMyData) => {
    const result = await saveUserData(data);
    if (result === 400) throw new AuthError("Erro no cadastro!");
    user?.fetchUserData();
    alert.success("Dados alterados com sucesso!");
  };

  const handleSubmitPassword = async (data: IMyPassword) => {
    const result = await saveUserPassword(data);
    if (result === 400) throw new AuthError("Erro ao trocar a senha!");
    setOldPassword("");
    setNewPassword("");
    alert.success("Senha alterada com sucesso!");
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
    oldPassword,
    newPassword,
    setName: handleFirstname,
    setLastName: handleLastName,
    setOldPassword: handlePassword,
    setNewPassword: handleConfirmPassword,
  };
};

export default useProfile;
