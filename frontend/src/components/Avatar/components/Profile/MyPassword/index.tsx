import { TabPanel, Button } from "../styles";
import Input from "components/Input";

import useProfile from "validations/useProfile";
import useError from "validations/useError";

interface Props {
  value: number;
}

const MyPassword = ({ value }: Props) => {
  const {
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    validatePasswords,
    handleSubmitPassword,
  } = useProfile();
  const { validateError } = useError();

  const submit = async () => {
    try {
      validatePasswords({ password, confirmPassword });

      await handleSubmitPassword({ password, confirmPassword });
    } catch (error: any) {
      validateError(error);
    }
  };

  return (
    <TabPanel
      role="tabpanel"
      hidden={value !== 1}
      id="tab-1"
      aria-labelledby="simple-tabpanel-1"
    >
      <div className="profile-container">
        <div className="profile-data">
          <Input
            name="password"
            onChange={setPassword}
            errors={[]}
            value={password}
            placeholder="Senha"
          />
          <Input
            name="confirmPassword"
            onChange={setConfirmPassword}
            errors={[]}
            value={confirmPassword}
            placeholder="Confirmar senha"
          />
          <div className="btn-container">
            <Button
              className="primary"
              disabled={password === "" || confirmPassword === ""}
              onClick={() => submit()}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </TabPanel>
  );
};

export default MyPassword;
