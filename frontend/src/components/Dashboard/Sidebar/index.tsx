import React from "react";
import Link from "./Link";
import links from "./data/links";

import { Container } from "./styles";

const SideBar = () => {
  return (
    <Container>
      {links.map((l) => (
        <Link
          key={l.label}
          icon={l.icon}
          iconSelected={l.iconSelected}
          label={l.label}
          url={l.url}
        />
      ))}
    </Container>
  );
};

export default SideBar;
