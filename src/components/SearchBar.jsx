import { useEffect, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IconContext } from "react-icons";
import "../styles/SearchBar.css";

export default function SearchBar({ setSearchTerm }) {
  const [searchInput, setSearchInput] = useState("");

  // Debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchInput, setSearchTerm]);

  return (
    <>
      <div className="input-container">
        <div className="input-label-container">
          <IconContext.Provider value={{ className: "search-icon" }}>
            <PiMagnifyingGlassBold />
          </IconContext.Provider>
          {/* <label htmlFor="name-input">Name: </label> */}
          <input
            type="text"
            name="name-input"
            id="name-input"
            placeholder="Search for pokemon by name e.g., Charizard"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
