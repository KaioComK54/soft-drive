import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginBox, Input, Button } from "./styles";

import Logo from "components/Logo";

const Register = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <div className="logo-container">
        <Logo size="large" />
        <h4>Registrar no sistema</h4>
      </div>
      <LoginBox>
        <Input placeholder="Nome" />
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirmar senha" />
        <div className="button-container">
          <Button onClick={() => navigate("/entrar")}>
            Já possuo um conta
          </Button>
          <Button className="primary">Cadastrar</Button>
        </div>
      </LoginBox>
    </LoginContainer>
  );
};

export default Register;
