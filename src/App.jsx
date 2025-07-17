import { useState, useEffect, useMemo } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar.jsx";
import CardContainer from "./components/CardContainer.jsx";
import { initialData } from "../initialData.js";

function App() {
  const [allPokemonData, setAllPokemonData] = useState(initialData);
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
  // Loading Data
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0`)
      .then((res) => res.json())
      .then((fullData) => {
        const promises = fullData.results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );
        Promise.all(promises).then((fullPokemonData) => {
          setAllPokemonData(fullPokemonData);
        });
      });
  }, []);

  console.log(currentPokemonData);
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

export default App;
