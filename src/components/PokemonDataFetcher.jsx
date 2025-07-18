import { useEffect, useState } from "react";
import { initialData } from "../../initialData.js";

function PokemonDataFetcher({ children }) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0`)
      .then((res) => res.json())
      .then((fullData) => {
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
      {isLoading && <p>Loading...</p>}
    </>
  );
}

export default PokemonDataFetcher;
