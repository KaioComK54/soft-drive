import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginBox, Input, Button } from "./styles";

import Logo from "components/Logo";

const Login = () => {
  const navigate = useNavigate();

  return (
    <LoginContainer>
      <div className="logo-container">
        <Logo size="large" />
      </div>
      <LoginBox>
        <Input placeholder="Email" />
        <Input placeholder="Senha" />
        <div className="button-container">
          <Button onClick={() => navigate("/registro")}>
            Criar uma nova conta
          </Button>
          <Button className="primary">Entrar</Button>
        </div>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;
