import "./Card.css";
import { typeColors } from "../typeColors";
export default function Card({ pokemonObject }) {
  function truncateText(str) {
    return str.length > 9 ? str.substring(0, 8) + "..." : str;
  }

  return (
    <div
      className="card"
      style={{
        backgroundColor: typeColors[`${pokemonObject.types[0].type.name}Bg`],
      }}
    >
      <div className="shine"></div>
      <img
        src={`${pokemonObject.sprites.front_default}`}
        alt={`Image of ${pokemonObject.name}`}
      />
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
