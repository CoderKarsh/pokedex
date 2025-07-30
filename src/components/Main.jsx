import { useState, useMemo, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CardContainer from "./CardContainer.jsx";
import SearchBar from "./SearchBar.jsx";
import Spinner from "./Spinner.jsx";
import Fuse from "fuse.js";
import "../styles/Main.css";

const options = {
  includeScore: true,
  keys: ["name"],
};

function Main({
  allPokemonData,
  minimalPokemonData,
  fetchData,
  URL,
  resetData,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const fuseIndex = useMemo(
    () => Fuse.createIndex(["name"], minimalPokemonData),
    [minimalPokemonData]
  );

  const fuse = useMemo(
    () => new Fuse(minimalPokemonData, options, fuseIndex),
    [minimalPokemonData, fuseIndex]
  );

  const hasSearchedRef = useRef(false);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      hasSearchedRef.current = true;
      const exactMatch = minimalPokemonData
        .filter((data) =>
          data.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
        .map((data) => data.name);
      const fuzzyMatch = fuse
        .search(searchTerm)
        .map((result) => result.item.name)
        .slice(0, 10);
      const allMatches = [...new Set([...exactMatch, ...fuzzyMatch])];
      // console.log(allMatches);
      fetchData(allMatches);
    } else {
      if (hasSearchedRef.current) resetData();
    }
    // Adding fetchData as dependency renders it a lot. Why?
  }, [searchTerm, minimalPokemonData, fuse]);


  return (
    <>
      <h1>PokéDex</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <InfiniteScroll
        dataLength={allPokemonData.length} //This is important field to render the next data
        next={URL !== null && fetchData}
        hasMore={URL !== null}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center", margin: "2rem" }}>
            <b>Yay! You have seen them all!</b>
          </p>
        }
      >
        <CardContainer pokemonDataList={allPokemonData} />
      </InfiniteScroll>
    </>
  );
}

export default Main;
