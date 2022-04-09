import React from "react";
import search from "assets/search.png";

import { Container } from "./styles";

interface Props {
  searchText: string;
  setSearchText: Function;
}

const SearchBar = ({ searchText, setSearchText }: Props) => {
  return (
    <Container>
      <img src={search} alt="ícone de pesquisa" />
      <input
        value={searchText}
        onChange={({ target }) => setSearchText(target.value)}
        placeholder="Pesquisar"
      />
    </Container>
  );
};

export default SearchBar;
