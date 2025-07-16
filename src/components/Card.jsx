import "./Card.css";
import { typeColors } from "../typeColors";
import { useRef } from "react";
export default function Card({ pokemonObject }) {
  const audioRef = useRef(null);

  function truncateText(str) {
    return str.length > 10 ? str.substring(0, 7) + "..." : str;
  }

  function handleClick() {
    audioRef.current.play();
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: typeColors[`${pokemonObject.types[0].type.name}Bg`],
      }}
      onClick={handleClick}
    >
      <audio src={pokemonObject.cries.latest} ref={audioRef}></audio>
      <div className="shine"></div>
      {pokemonObject.sprites.front_default !== null ? (
        <img
          src={`${pokemonObject.sprites.front_default}`}
          alt={`Image of ${pokemonObject.name}`}
        />
      ) : (
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
          alt={`Image not found`}
        />
      )}

      <h2 style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {truncateText(
          pokemonObject.name.charAt(0).toUpperCase() +
            pokemonObject.name.slice(1)
        )}
      </h2>
      {pokemonObject.types.map((type, index) => (
        <span
          key={index}
          style={{
            backgroundColor: typeColors[type.type.name],
          }}
        >
          {type.type.name.toUpperCase()}
        </span>
      ))}
      <span className="pokemon-no">#{pokemonObject.id}</span>
    </div>
  );
}
