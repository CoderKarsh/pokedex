import { useEffect, useState } from "react";
import Spinner from "./Spinner.jsx";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function PokemonDataFetcher({ children }) {
  const [minimalData, setMinimalData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMinimalData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}?limit=1302&offset=0`);
      const responseJSON = await response.json();
      const results = responseJSON.results; // only has name and url for each pokemon
      setMinimalData(results);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (limit = 20, offset = 1, names = []) => {
    setIsLoading(true);
    try {
      if (names.length > 0) {
        const nameData = await Promise.all(
          names.map(async (name) => {
            const response = await fetch(`${BASE_URL}/${name}`);
            const responseJSON = await response.json();
            return responseJSON;
          })
        );
        setData(nameData);
      } else {
        const response = await fetch(
          `${BASE_URL}?limit=${limit}&offset=${offset - 1}`
        );
        const responseJSON = await response.json();
        const results = responseJSON.results; // only has name and url for each pokemon
        const resultsPromises = results.map(async (result) => {
          const resultsJSON = await fetch(result.url);
          return await resultsJSON.json();
        });

        const finalData = await Promise.all(resultsPromises);
        setData(finalData);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(data);
  useEffect(() => {
    fetchMinimalData();
    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <p>Error in fetching data {error}</p>
      ) : (
        children(data, minimalData, fetchData)
      )}

      {isLoading && <Spinner />}
    </>
  );
}

export default PokemonDataFetcher;
