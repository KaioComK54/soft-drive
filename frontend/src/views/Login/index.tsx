import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginBox, Button } from "./styles";

import Logo from "components/Logo";
import Input from "components/Input";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleEmail = (value: string) => {
    setEmail(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  return (
    <LoginContainer>
      <div className="logo-container">
        <Logo size="large" />
      </div>
      <LoginBox>
        <Input
          name="email"
          onChange={handleEmail}
          errors={[]}
          value={email}
          placeholder="Email"
        />
        <Input
          name="password"
          onChange={handlePassword}
          errors={[]}
          value={password}
          placeholder="Senha"
        />

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
