import { usePokemonStore } from "../stores/pokemon/pokemonStore";
import { Card } from "./Card";

const MainView = () => {
  const { pokemons } = usePokemonStore();
  return <Card tipeSelected={pokemons} />;
};

export default MainView;
