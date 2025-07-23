import "./App.css";
import PokemonDataFetcher from "./components/PokemonDataFetcher.jsx";

import Main from "./components/Main.jsx";

function App() {
  return (
    <>
      <PokemonDataFetcher>
        {(data, minimalData, fetchData) => (
          <Main allPokemonData={data} minimalPokemonData={minimalData} fetchData={ fetchData } />
        )}
      </PokemonDataFetcher>
    </>
  );
}

export default App;
