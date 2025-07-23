import { useState, useMemo, useEffect } from "react";
import CardContainer from "./CardContainer.jsx";
import SearchBar from "./SearchBar.jsx";
import Button from "./Button.jsx";
import PaginationControls from "./PaginationControls.jsx";
import Fuse from "fuse.js";
import "../styles/Main.css";

const options = {
  includeScore: true,
  keys: ["name"],
};

function Main({ allPokemonData, minimalPokemonData, fetchData }) {
  const [offset, setOffset] = useState(1);
  const [limit, setLimit] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  const fuseIndex = useMemo(
    () => Fuse.createIndex(["name"], minimalPokemonData),
    [minimalPokemonData]
  );
  const fuse = useMemo(
    () => new Fuse(minimalPokemonData, options, fuseIndex),
    [minimalPokemonData, fuseIndex]
  );

  useEffect(() => {
    // fetchData(20, 100, ["pikachu"]);
    if (searchTerm.trim() !== "") {
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
      console.log(allMatches);
      fetchData(20, 0, [...new Set([...exactMatch, ...fuzzyMatch])]);
    } else {
      fetchData(limit, offset);
    }
    // Add dependencies that trigger fetch: searchTerm, offset, limit, fetchData, allPokemonData, fuse
  }, [searchTerm, offset, limit, minimalPokemonData, fuse]);

  return (
    <>
      <h1>PokéDex</h1>
      <SearchBar
        setLimit={setLimit}
        setOffset={setOffset}
        setSearchTerm={setSearchTerm}
      />
      <CardContainer pokemonDataList={allPokemonData} />
      {searchTerm === "" ? (
        <PaginationControls>
          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              setOffset((prev) => Math.max(0, prev - limit));
            }}
          >
            {"<-"}
          </Button>

          <Button
            onClick={() => {
              window.scrollTo(0, 0);
              setOffset((prev) => Math.min(1300, prev + limit));
            }}
          >
            {"->"}
          </Button>
        </PaginationControls>
      ) : null}
    </>
  );
}

export default Main;
