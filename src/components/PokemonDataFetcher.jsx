import { useEffect, useState } from "react";
import { initialData } from "../../initialData.js";
import Spinner from "./Spinner.jsx";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function PokemonDataFetcher({ children }) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}?limit=1302&offset=0`)
      .then((res) => res.json())
      .then((fullData) => {
        // fullData only contains name and url for the pokemon in results array. Need to fetch again
        const promises = fullData.results.map((result) =>
          fetch(result.url).then((res) => res.json())
        );
        Promise.all(promises).then((fullPokemonData) => {
          setData(fullPokemonData);
          setIsLoading(false);
        });
      });
  }, []);

  return (
    <>
      {children(data)}
      {isLoading && <Spinner />}
    </>
  );
}

export default PokemonDataFetcher;
