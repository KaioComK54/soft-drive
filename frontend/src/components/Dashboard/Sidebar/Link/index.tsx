import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Container } from "./styles";

interface Props {
  icon: string;
  iconSelected: string;
  label: string;
  url: string;
}

const SideBar = ({ icon, iconSelected, label, url }: Props) => {
  const location = useLocation();

  const isSelected = () => location.pathname === url;

  return (
    <Container selected={isSelected()}>
      <Link className="link" to={url}>
        <img
          src={isSelected() ? iconSelected : icon}
          alt={`Icone do menu chamado ${label}`}
        />
        <h3 className="label">{label}</h3>
      </Link>
    </Container>
  );
};

export default SideBar;
