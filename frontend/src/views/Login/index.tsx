import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginBox, Button, ErrorBox } from "./styles";

import Logo from "components/Logo";
import Input from "components/Input";

import useLogin from "validations/useLogin";
import useError from "validations/useError";

const Login = () => {
  const navigate = useNavigate();

  const { validateError } = useError();

  const {
    validateData,
    handleSubmit,
    setEmail,
    setPassword,
    email,
    password,
    errors,
    errorMessage,
    emptyFields,
  } = useLogin();

  const submit = async () => {
    try {
      validateData({ email, password });

      await handleSubmit({ email, password });
    } catch (error: any) {
      validateError(error);
    }
  };

  return (
    <LoginContainer>
      <div className="logo-container">
        <Logo size="large" />
      </div>
      <LoginBox>
        <Input
          name="email"
          onChange={setEmail}
          errors={errors}
          value={email}
          placeholder="Email"
        />
        <Input
          name="password"
          onChange={setPassword}
          errors={errors}
          value={password}
          placeholder="Senha"
          type="password"
        />

        {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

        <div className="button-container">
          <Button onClick={() => navigate("/registro")}>
            Criar uma nova conta
          </Button>
          <Button
            className="primary"
            disabled={emptyFields()}
            onClick={() => submit()}
          >
            Entrar
          </Button>
        </div>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
