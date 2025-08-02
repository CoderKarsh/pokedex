import { useEffect, useState, useRef } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IconContext } from "react-icons";
import "../styles/SearchBar.css";

export default function SearchBar({ setSearchTerm }) {
  const [searchInput, setSearchInput] = useState("");
  const searchBarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // Debounce
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500); // 300ms debounce time

    return () => clearTimeout(debounceTimer);
  }, [searchInput, setSearchTerm]);

  // Intersection Observer to detect when the search bar is sticky
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // `isIntersecting` is false when the element is no longer visible
        // in the viewport, which is when it becomes sticky.
        setIsSticky(!entry.isIntersecting);
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px 0px -100% 0px", // A small margin can help prevent flickering
        threshold: 0, // Trigger when any part of the element is visible
      }
    );

    if (searchBarRef.current) {
      observer.observe(searchBarRef.current);
    }

    return () => {
      if (searchBarRef.current) {
        observer.unobserve(searchBarRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`input-container  ${!isSticky ? "sticky-bar" : ""}`}
        ref={searchBarRef}
      >
        {
          <h2
            className={`${!isSticky ? "visible" : ""} pokeball `}
          >P</h2>
        }
        <div className="input-label-container">
          <IconContext.Provider value={{ className: `search-icon` }}>
            <PiMagnifyingGlassBold />
          </IconContext.Provider>
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
