import { useContext } from "react";

import UserContext from "context/UserContext";

import { TabPanel, Button } from "../styles";
import Input from "components/Input";

import useProfile from "validations/useProfile";
import useError from "validations/useError";

interface Props {
  value: number;
  handleClose: Function;
}

const MyData = ({ value, handleClose }: Props) => {
  const user = useContext(UserContext);

  const {
    firstName,
    lastName,
    errors,
    setName,
    setLastName,
    validateData,
    handleSubmitData,
  } = useProfile();
  const { validateError } = useError();

  const submit = async () => {
    try {
      validateData({ firstName, lastName });

      await handleSubmitData({ firstName, lastName });
      handleClose();
    } catch (error: any) {
      validateError(error);
    }
  };

  return (
    <TabPanel
      role="tabpanel"
      hidden={value !== 0}
      id="tab-0"
      aria-labelledby="simple-tabpanel-0"
    >
      <div className="profile-container">
        <div className="profile-img">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.firstName[0]}+${user?.lastName[0]}&background=3C4043&color=fff`}
          />
        </div>

        <div className="profile-data">
          <Input
            name="email"
            onChange={() => {}}
            errors={errors}
            value={user?.email}
            placeholder="Email"
            disabled={true}
          />
          <Input
            name="firstName"
            onChange={setName}
            errors={errors}
            value={firstName}
            placeholder="Nome"
          />
          <Input
            name="lastName"
            onChange={setLastName}
            errors={errors}
            value={lastName}
            placeholder="Sobrenome"
          />
          <div className="btn-container">
            <Button
              className="primary"
              disabled={firstName === "" || lastName === ""}
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

export default MyData;
