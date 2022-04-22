import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import useRedirectToLogin from "utils/useRedirectLogin";

interface Props {
  open: boolean;
  close: any;
  reference: any;
  openProfileModal: Function;
}

const Menu = ({ open, close, reference, openProfileModal }: Props) => {
  const { redirectToLogin } = useRedirectToLogin();

  const profile = () => {
    close();
    openProfileModal();
  };

  const logout = () => redirectToLogin();

  return (
    <Popover
      open={open}
      anchorEl={reference}
      onClose={close}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <MenuItem onClick={profile}>Meu perfil</MenuItem>
      <MenuItem onClick={logout}>Sair</MenuItem>
    </Popover>
  );
};

export default Menu;
