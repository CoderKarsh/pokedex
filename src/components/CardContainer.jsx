import Card from "./Card";
import "../styles/CardContainer.css";
import { memo } from "react";

function CardContainer({ pokemonDataList }) {
  return (
    <div className="card-container">
      {pokemonDataList.map((pokemonData) => (
        <Card key={pokemonData.id} pokemonObject={pokemonData} />
      ))}
    </div>
  );
}

export default memo(CardContainer);
