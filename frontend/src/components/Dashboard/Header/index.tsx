import { useState } from "react";

import Logo from "components/Logo";
import SearchBar from "components/Searchbar";
import Avatar from "components/Avatar";

import { Container } from "./styles";

const Header = () => {
  const [search, setSearch] = useState("");

  return (
    <Container>
      <Logo size="small" />
      <SearchBar searchText={search} setSearchText={setSearch} />
      <Avatar />
    </Container>
  );
};

export default Header;
