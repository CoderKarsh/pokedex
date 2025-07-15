import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

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
  }, [limit, offset]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${1302}&offset=${0}`)
      .then((res) => res.json())
      .then((fetchedData) => {
        const fetchPromises = fetchedData.results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );

        Promise.all(fetchPromises).then((pokemonDataArray) =>
          setAllPokemonData(
            pokemonDataArray.filter((data) =>
              data.name.includes(searchTerm.toLowerCase())
            )
          )
        );
      });
  }, [searchTerm]);

  console.log();

  function handleHover() {}

  console.log(allPokemonData);
  function handleSubmit(formData) {
    const formOffset = formData.get("offset-input");
    const formLimit = formData.get("limit-input");
    const formName = formData.get("name-input");

    formName !== "" ? setSearchTerm(formName) : null;

    formOffset !== ""
      ? formOffset > 0
        ? setOffset(formOffset - 1)
        : alert("Offset should be 1 or more")
      : null;
    formLimit
      ? formLimit > 0
        ? setLimit(formLimit)
        : alert("No. of Cards should be 1 or more")
      : null;
  }
  return (
    <>
      <form action={handleSubmit}>
        <div className="input-label-container">
          <label htmlFor="name-input">Offset: </label>
          <input
            type="text"
            name="name-input"
            id="name-input"
            // defaultValue={1}
            placeholder="Charizard"
          />
        </div>

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
          <label htmlFor="limit-input">No. of Cards: </label>
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
      <div className="card-container">
        {allPokemonData.map((pokemonData) => (
          <Card
            key={pokemonData.id}
            pokemonObject={pokemonData}
            handleHover={handleHover()}
          />
        ))}
      </div>
    </>
  );
}

export default App;
