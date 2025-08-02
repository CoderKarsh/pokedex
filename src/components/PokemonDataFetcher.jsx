import { useEffect, useState } from "react";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

function PokemonDataFetcher({ children }) {
  const [URL, setURL] = useState(BASE_URL);
  const [minimalData, setMinimalData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchMinimalData = async () => {
    try {
      const response = await fetch(`${BASE_URL}?limit=1302&offset=0`);
      const responseJSON = await response.json();
      const results = responseJSON.results; // only has name and url for each pokemon
      setMinimalData(results);
    } catch (err) {
      setError(err);
    }
  };

  const fetchData = async (names = [], reset = false) => {
    setIsLoading(true);
    try {
      if (reset) {
        // If resetting, clear data and reset URL
        setData([]);
        setURL(BASE_URL); // Reset to the very first page
      }

      if (names.length > 0) {
        // Search functionality: replace data
        const nameData = await Promise.all(
          names.map(async (name) => {
            const response = await fetch(`${BASE_URL}/${name}`);
            const responseJSON = await response.json();
            return responseJSON;
          })
        );
        setData(nameData);
        setURL(null); // No more data to fetch via infinite scroll for search results
      } else {
        // Infinite scroll/initial load: append data
        const currentFetchURL = reset ? BASE_URL : URL; // Use BASE_URL for reset, otherwise current URL
        if (!currentFetchURL) {
          // Prevent fetching if URL is null (e.g., after a search)
          setIsLoading(false);
          return;
        }

        const response = await fetch(currentFetchURL);
        const responseJSON = await response.json();
        setURL(responseJSON.next);

        const results = responseJSON.results;
        const resultsPromises = results.map(async (result) => {
          const resultsJSON = await fetch(result.url);
          return await resultsJSON.json();
        });

        const finalData = await Promise.all(resultsPromises);
        setData((prev) => (reset ? finalData : [...prev, ...finalData])); // If reset, start fresh, else append
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // The `resetData` function is now simpler, it just calls `fetchData` with the reset flag
  const resetData = () => {
    fetchData([], true); // Call fetchData with empty names and reset flag
  };

  useEffect(() => {
    fetchMinimalData();
    fetchData(); // Initial load
  }, []); // Run only once on component mount

  return (
    <>
      {error ? (
        <p>Error in fetching data {error}</p>
      ) : (
        children(data, minimalData, URL, fetchData, resetData)
      )}
    </>
  );
}

export default PokemonDataFetcher;
