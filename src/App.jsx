import "./App.css";
import PokemonDataFetcher from "./components/PokemonDataFetcher.jsx";

import Main from "./components/Main.jsx";

function App() {
  return (
    <>
      <PokemonDataFetcher>
        {(data) => <Main allPokemonData={data} />}
      </PokemonDataFetcher>
    </>
  );
}

export default App;
