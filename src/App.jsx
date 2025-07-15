import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20`)
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

  console.log(allPokemonData);
  return (
    <div className="card-container">
      {allPokemonData.map((pokemonData) => (
        <Card key={pokemonData.id} pokemonObject={pokemonData} />
      ))}
    </div>
  );
}

export default App;
