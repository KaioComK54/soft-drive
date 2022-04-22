import { useContext, useState } from "react";
import { Container } from "./styles";
import UserContext from "context/UserContext";

import Menu from "./components/Menu";
import ProfileDialog from "./components/Profile";

const Avatar = () => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const [openProfileModal, setOpenProfileModal] = useState<boolean>(false);
  const user = useContext(UserContext);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  return (
    <Container>
      <button onClick={handleOpenMenu}>
        <img
          src={`https://ui-avatars.com/api/?name=${user?.firstName[0]}+${user?.lastName[0]}&background=3C4043&color=fff`}
        />
      </button>
      <Menu
        open={Boolean(anchor)}
        close={handleCloseMenu}
        reference={anchor}
        openProfileModal={() => setOpenProfileModal(true)}
      />
      <ProfileDialog
        open={openProfileModal}
        close={() => setOpenProfileModal(false)}
      />
    </Container>
  );
};

export default Avatar;
