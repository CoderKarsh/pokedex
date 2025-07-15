import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const offset = 40;
  const limit = 20;
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((fetchedData) => {
        const fetchPromises = fetchedData.results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );

        Promise.all(fetchPromises).then((pokemonDataArray) =>
          setAllPokemonData(pokemonDataArray)
        );
      });
  }, []);

  function handleHover() {}

  console.log(allPokemonData);
  return (
    <div className="card-container">
      {allPokemonData.map((pokemonData) => (
        <Card
          key={pokemonData.id}
          pokemonObject={pokemonData}
          handleHover={handleHover()}
        />
      ))}
    </div>
  );
}

export default App;
