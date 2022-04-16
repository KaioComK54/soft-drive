import React, { useContext } from "react";
import { Container } from "./styles";
import UserContext from "context/UserContext";

const Avatar = () => {
  const user = useContext(UserContext);

  return (
    <Container>
      <img
        src={`https://ui-avatars.com/api/?name=${user?.firstName[0]}+${user?.lastName[0]}&background=3C4043&color=fff`}
      />
    </Container>
  );
};

export default Avatar;
