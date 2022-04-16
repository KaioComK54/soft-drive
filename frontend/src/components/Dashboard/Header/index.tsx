import { useState, useContext } from "react";

import UserContext from "context/UserContext";

import Logo from "components/Logo";
import SearchBar from "components/Searchbar";
import Avatar from "components/Avatar";

import { Container } from "./styles";

const Header = () => {
  const [search, setSearch] = useState("");

  const { firstName } = useContext(UserContext);

  return (
    <Container>
      <Logo size="small" />
      <SearchBar searchText={search} setSearchText={setSearch} />
      <Avatar />
    </Container>
  );
};

export default Header;
