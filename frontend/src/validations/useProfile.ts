import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveUserData,
  saveUserProfile,
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

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

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

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setErrorMessage("As senhas devem ter no mínimo 6 dígitos!");
      setErrors((errors) => [...errors, "oldPassword", "newPassword"]);
      throw new Error();
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        `A senha deve possuir pelo menos: 
         1 caractere minúsculo, 
         1 caractere maiúsculo, 
         1 dígito numérico, 
         1 dígito especial.`
      );
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

  const validatePasswords = ({ oldPassword, newPassword }: IMyPassword) => {
    setErrorMessage("");
    setErrors([]);
    validatePassword(oldPassword);
    validatePassword(newPassword);
  };

  const handleSubmitData = async (data: IMyData) => {
    const result = await saveUserProfile(data);
    if (result >= 400) throw new AuthError("Erro ao alterar dados!");
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
