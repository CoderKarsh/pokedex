import { useEffect, useState } from "react";
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
          <label htmlFor="name-input">Name: </label>
          <input
            type="text"
            name="name-input"
            id="name-input"
            placeholder="e.g., Charizard"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
