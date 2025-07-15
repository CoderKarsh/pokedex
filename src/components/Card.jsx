import "./Card.css";
import { typeColors } from "../typeColors";
export default function Card({ pokemonObject }) {
  return (
    <div
      className="card"
      style={{ backgroundColor: typeColors[pokemonObject.types[0].type.name] }}
    >
      <img
        src={`${pokemonObject.sprites.front_default}`}
        alt={`Image of ${pokemonObject.name}`}
      />
      <h2>
        {pokemonObject.name.charAt(0).toUpperCase() +
          pokemonObject.name.slice(1)}
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
