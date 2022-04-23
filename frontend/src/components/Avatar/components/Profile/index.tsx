import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";

import { Container, Title } from "./styles";

import MyData from "./MyData";
import MyPassword from "./MyPassword";

interface IProfileProps {
  open: boolean;
  close: Function;
}

const ProfileDialog = ({ open, close }: IProfileProps) => {
  const [currentTab, setCurrentTab] = useState<number>(0);

  const handleClose = () => close();

  const handleTab = (event: React.SyntheticEvent, newValue: number) =>
    setCurrentTab(newValue);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <Container>
        <div className="row">
          <Title>Meu Perfil</Title>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div>
          <Tabs
            value={currentTab}
            onChange={handleTab}
            aria-label="basic tabs example"
          >
            <Tab
              label="Alterar dados"
              id="tab-0"
              aria-controls="simple-tabpanel-0"
            />
            <Tab
              label="Alterar senha"
              id="tab-1"
              aria-controls="simple-tabpanel-1"
            />
          </Tabs>
        </div>
        <div>
          <MyData value={currentTab} handleClose={handleClose} />
          <MyPassword value={currentTab} handleClose={handleClose} />
        </div>
      </Container>
    </Dialog>
  );
};

export default ProfileDialog;
