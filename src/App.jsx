import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [currentPokemonData, setCurrentPokemonData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Debounce search input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  // Loading Data
  useEffect(() => {
    // Fetch only first 20 for quick render
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=0`)
      .then((res) => res.json())
      .then((initialData) => {
        const promises = initialData.results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );
        Promise.all(promises).then((data) => {
          setCurrentPokemonData(data);
          setAllPokemonData(data); // start with 20
        });
      });

    // Background fetch for the full list
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

  // Filtering
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

  function handleSubmit(formData) {
    const formOffset = parseInt(formData.get("offset-input"), 10);
    const formLimit = parseInt(formData.get("limit-input"), 10);
    const formName = formData.get("name-input");

    if (formName !== null && formName.trim() !== "") {
      setSearchTerm(formName);
      setLimit(1302);
      setOffset(1);
    } else {
      setSearchTerm("");
      setLimit(isNaN(formLimit) ? 20 : formLimit);
      setOffset(isNaN(formOffset) ? 1 : formOffset);
    }

    if (formOffset <= 0) {
      alert("Offset should be 1 or more");
    }
    if (formLimit <= 0) {
      alert("No. of Cards should be 1 or more");
    }
  }

  return (
    <>
      <h1>PokéDex</h1>
      <div className="input-container">
        <div className="input-label-container">
          <label htmlFor="name-input">Name: </label>
          <input
            type="text"
            name="name-input"
            id="name-input"
            placeholder="Charizard"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <form action={handleSubmit}>
          <div className="input-label-container">
            <label htmlFor="offset-input">Offset: </label>
            <input
              type="number"
              name="offset-input"
              id="offset-input"
              // defaultValue={1}
              placeholder="1"
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="limit-input">Cards: </label>
            <input
              type="number"
              name="limit-input"
              id="limit-input"
              // defaultValue={20}
              placeholder="20"
            />
          </div>

          <button type="submit">Filter Pokemon</button>
        </form>
      </div>
      <div className="card-container">
        {currentPokemonData.map((pokemonData) => (
          <Card key={pokemonData.id} pokemonObject={pokemonData} />
        ))}
      </div>
    </>
  );
}

export default App;
