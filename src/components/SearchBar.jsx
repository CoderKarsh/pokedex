import { useEffect, useState } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ setSearchTerm, setLimit, setOffset }) {
  const [searchInput, setSearchInput] = useState("");

  // Debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchInput, setSearchTerm]);

  function handleSubmit(formData) {
    const formOffset = parseInt(formData.get("offset-input"), 10);
    const formLimit = parseInt(formData.get("limit-input"), 10);
    const formName = formData.get("name-input");

    if (formName !== null && formName.trim() !== "") {
      setSearchTerm(formName);
      setLimit(20);
      setOffset(1);
    } else {
      setSearchTerm("");
      setLimit(isNaN(formLimit) ? 1302 : formLimit);
      setOffset(isNaN(formOffset) ? 1 : formOffset);
    }

    if (formOffset <= 0) {
      alert("Offset should be 1 or more");
    }
    if (formLimit <= 0) {
      alert("No. of Cards should be 1 or more");
    }
  }

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
        <form action={handleSubmit}>
          <div className="input-label-container">
            <label htmlFor="offset-input">Offset: </label>
            <input
              type="number"
              name="offset-input"
              id="offset-input"
              // defaultValue={1}
              placeholder="e.g., 1"
            />
          </div>
          <div className="input-label-container">
            <label htmlFor="limit-input">Cards: </label>
            <input
              type="number"
              name="limit-input"
              id="limit-input"
              // defaultValue={20}
              placeholder="e.g., 20"
            />
          </div>

          <button type="submit">Filter Pokemon</button>
        </form>
      </div>
    </>
  );
}
