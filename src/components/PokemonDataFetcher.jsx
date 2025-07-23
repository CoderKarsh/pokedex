import { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function PokemonDataFetcher({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}?limit=1302&offset=0`);
        const responseJSON = await response.json();
        const results = responseJSON.results; // only has name and url for each pokemon

        const resultsPromises = results.map(async (result) => {
          const resultsJSON = await fetch(result.url);
          return await resultsJSON.json();
        });

        const finalData = await Promise.all(resultsPromises);
        setData(finalData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      {error ? <p>Error in fetching data {error}</p> : children(data)}

      {isLoading && <Spinner />}
    </>
  );
}

export default PokemonDataFetcher;
