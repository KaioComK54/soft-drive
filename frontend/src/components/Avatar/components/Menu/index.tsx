import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import useRedirectToLogin from "utils/useRedirectLogin";
import { useNavigate } from "react-router-dom";

interface Props {
  open: boolean;
  close: any;
  reference: any;
}

const Menu = ({ open, close, reference }: Props) => {
  const navigate = useNavigate();
  const { redirectToLogin } = useRedirectToLogin();

  const profile = () => navigate("/perfil");

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
