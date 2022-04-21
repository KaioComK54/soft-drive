import { useContext, useState } from "react";
import { Container } from "./styles";
import UserContext from "context/UserContext";

import Menu from "./components/Menu";

const Avatar = () => {
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const user = useContext(UserContext);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Container>
      <button onClick={handleOpen}>
        <img
          src={`https://ui-avatars.com/api/?name=${user?.firstName[0]}+${user?.lastName[0]}&background=3C4043&color=fff`}
        />
      </button>
      <Menu open={Boolean(anchor)} close={handleClose} reference={anchor} />
    </Container>
  );
};

export default Avatar;
