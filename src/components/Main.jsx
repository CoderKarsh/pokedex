import { useState, useMemo } from "react";
import CardContainer from "./CardContainer.jsx";
import SearchBar from "./SearchBar.jsx";
import Fuse from "fuse.js";
import "../styles/Main.css";

const options = {
  includeScore: true,
  keys: ["name"],
};

function Main({ allPokemonData }) {
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = new Fuse(allPokemonData, options);

  const currentPokemonData = useMemo(() => {
    if (searchTerm.trim() !== "") {
      const exactMatch = allPokemonData.filter((data) =>
        data.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
      const fuzzyMatch = fuse
        .search(searchTerm)
        .map((data) => data.item)
        .slice(0, 10);
      console.log(exactMatch.map((match) => match.name));
      console.log(fuzzyMatch.map((match) => match.name));
      return [...new Set([...exactMatch, ...fuzzyMatch])];
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
