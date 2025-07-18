import { useState, useMemo } from "react";
import CardContainer from "./CardContainer.jsx";
import SearchBar from "./SearchBar.jsx";
import Spinner from "./Spinner.jsx";
import "../styles/Main.css";

function Main({ allPokemonData }) {
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const currentPokemonData = useMemo(() => {
    if (searchTerm.trim() !== "") {
      return allPokemonData.filter((data) =>
        data.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return allPokemonData
        .slice(offset - 1, offset + limit - 1)
        .filter(Boolean);
    }
  }, [allPokemonData, offset, searchTerm, limit]);
  return (
    <>
      <h1>PokéDex</h1>
      <SearchBar
        setLimit={setLimit}
        setOffset={setOffset}
        setSearchTerm={setSearchTerm}
      />
      <CardContainer pokemonDataList={currentPokemonData} />
    </>
  );
}

export default Main;
