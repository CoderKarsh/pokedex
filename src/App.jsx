import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar.jsx";
import { initialData } from "../initialData.js";

function App() {
  const [allPokemonData, setAllPokemonData] = useState(initialData);
  const [currentPokemonData, setCurrentPokemonData] = useState(initialData);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtering & Searching
  useEffect(() => {
    if (searchTerm !== "" || searchTerm.trim() !== "") {
      setCurrentPokemonData(
        allPokemonData.filter((data) =>
          data.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      const sliced = allPokemonData.slice(offset - 1, offset + limit - 1);
      setCurrentPokemonData(sliced.filter(Boolean));
    }
  }, [allPokemonData, offset, limit, searchTerm]);

  console.log(currentPokemonData);
  return (
    <>
      <h1>PokéDex</h1>
      <SearchBar
        setLimit={setLimit}
        setOffset={setOffset}
        setSearchTerm={setSearchTerm}
      />
      <div className="card-container">
        {currentPokemonData.map((pokemonData) => (
          <Card key={pokemonData.id} pokemonObject={pokemonData} />
        ))}
      </div>
    </>
  );
}

export default App;
