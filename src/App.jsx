import "./App.css";
import PokemonDataFetcher from "./components/PokemonDataFetcher.jsx";

import Main from "./components/Main.jsx";

function App() {
  return (
    <>
      <PokemonDataFetcher>
        {(data, minimalData, URL, fetchData, resetData) => (
          <Main
            allPokemonData={data}
            minimalPokemonData={minimalData}
            fetchData={fetchData}
            URL={URL}
            resetData={resetData}
          />
        )}
      </PokemonDataFetcher>
    </>
  );
}

export default App;
