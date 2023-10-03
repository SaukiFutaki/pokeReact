import { useEffect, useState } from "react";
import PokeList from "./components/PokeList";
import PokeDetail from "./components/PokeDetail";
import styles from "./App.module.css";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results))
      .catch((error) => console.log(error));
  }, []);
  console.log(pokemonList);

  useEffect(() => {
    if (!selectedPokemonName) return;
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`)
      .then((res) => res.json())
      .then((data) => setPokemonDetail(data))
      .catch((error) => console.log(error));
  }, [selectedPokemonName]);

  const clear = () => {
    setSelectedPokemonName("");
    setPokemonDetail(null);
  };
  return (
    <div className={styles.container}>
      <h2>PokeAPI</h2>
      <PokeList
        pokemonList={pokemonList}
        setSelectedPokemonName={setSelectedPokemonName}
      />
      {pokemonDetail && (
        <div>
          <h2>Pokemon Detail</h2>
          <PokeDetail pokemonDetail={pokemonDetail} />
          <button className={styles.button} onClick={() => clear()}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
