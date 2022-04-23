import { TabPanel, Button, ErrorBox } from "../styles";
import Input from "components/Input";

import useProfile from "validations/useProfile";
import useError from "validations/useError";

interface Props {
  value: number;
  handleClose: Function;
}

const MyPassword = ({ value, handleClose }: Props) => {
  const {
    oldPassword,
    newPassword,
    setOldPassword,
    setNewPassword,
    validatePasswords,
    handleSubmitPassword,
    errorMessage,
    errors,
  } = useProfile();
  const { validateError } = useError();

  const submitPass = async () => {
    try {
      validatePasswords({ oldPassword, newPassword });

      await handleSubmitPassword({ oldPassword, newPassword });
      handleClose();
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
            name="oldPassword"
            onChange={setOldPassword}
            errors={errors}
            value={oldPassword}
            placeholder="Senha"
            type="password"
          />
          <Input
            name="newPassword"
            onChange={setNewPassword}
            errors={errors}
            value={newPassword}
            placeholder="Confirmar senha"
            type="password"
          />

          {errorMessage && <ErrorBox>{errorMessage}</ErrorBox>}

          <div className="btn-container">
            <Button
              className="primary"
              disabled={oldPassword === "" || newPassword === ""}
              onClick={() => submitPass()}
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
