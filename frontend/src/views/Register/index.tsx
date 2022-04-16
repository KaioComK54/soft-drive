import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginBox, Button, ErrorBox } from "../Login/styles";

import Logo from "components/Logo";
import Input from "components/Input";

import useRegister from "validations/useRegister";
import useError from "validations/useError";

const Register = () => {
  const navigate = useNavigate();

  const { validateError } = useError();

  const {
    validateData,
    handleSubmit,
    setName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    errors,
    errorMessage,
    emptyFields,
  } = useRegister();

  const submit = async () => {
    try {
      validateData({ firstName, lastName, email, password, confirmPassword });

      await handleSubmit({ firstName, lastName, email, password });
    } catch (error: any) {
      validateError(error);
    }
  };

  return (
    <LoginContainer>
      <div className="logo-container">
        <Logo size="large" />
        <h4>Registrar no sistema</h4>
      </div>
      <LoginBox>
        <Input
          name="firstName"
          onChange={setName}
          errors={errors}
          value={firstName}
          placeholder="Nome"
          type="text"
        />
        <Input
          name="lastName"
          onChange={setLastName}
          errors={errors}
          value={lastName}
          placeholder="Sobrenome"
          type="text"
        />
        <Input
          name="email"
          onChange={setEmail}
          errors={errors}
          value={email}
          placeholder="Email"
          type="text"
        />
        <Input
          name="password"
          onChange={setPassword}
          errors={errors}
          value={password}
          placeholder="Senha"
          type="password"
        />
        <Input
          name="confirmPassword"
          onChange={setConfirmPassword}
          errors={errors}
          value={confirmPassword}
          placeholder="Confirmar senha"
          type="password"
        />

        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

        <div className="button-container">
          <Button onClick={() => navigate("/entrar")}>
            Já possuo um conta
          </Button>
          <Button
            className="primary"
            disabled={emptyFields()}
            onClick={() => submit()}
          >
            Cadastrar
          </Button>
        </div>
      </LoginBox>
    </LoginContainer>
  );
};

export default Register;
