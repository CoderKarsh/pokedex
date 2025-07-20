import "./App.css";
import PokemonDataFetcher from "./components/PokemonDataFetcher.jsx";

import Main from "./components/Main.jsx";

function App() {
  return (
    <>
      <h1>PokéDex</h1>
      <PokemonDataFetcher>
        {(data) => <Main allPokemonData={data} />}
      </PokemonDataFetcher>
    </>
  );
}

export default App;
