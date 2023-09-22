import { useEffect, useState } from "react";
import "./App.css";
import MainView from "./components/MainView";
import Sidebar from "./components/Sidebar";
import { usePokemonStore } from "./stores/pokemon/pokemonStore";

function App() {
  const {
    pokemonTypes,
    setPokemonTypes,
    selectedType,
    setSelectedType,
    setPokemons,
  } = usePokemonStore();

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => {
        const types = data.results.map((type: any) => type.name);
        setPokemonTypes(types);
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then((res) => res.json())
        .then((data) => {
          const pokemonList = data.pokemon.map((poke: any) => poke.pokemon);
          const promises = pokemonList.map((pokemon: any) =>
            fetch(pokemon.url)
              .then((res) => res.json())
              .then(async (data) => {
                // Obtiene información adicional sobre el Pokémon desde otra API
                const pokemonInfoResponse = await fetch(
                  `https://pokeapi.co/api/v2/pokemon/${data.id}`
                );
                const pokemonInfoData = await pokemonInfoResponse.json();

                const pokemonAttributes = {
                  life: pokemonInfoData.stats.find(
                    (stat: any) => stat.stat.name === "hp"
                  ).base_stat,
                  attack: pokemonInfoData.stats.find(
                    (stat: any) => stat.stat.name === "attack"
                  ).base_stat,
                  defense: pokemonInfoData.stats.find(
                    (stat: any) => stat.stat.name === "defense"
                  ).base_stat,
                };

                return {
                  name: data.name,
                  imageUrl: data.sprites.front_default,
                  attributes: pokemonAttributes,
                  // Puedes agregar otros atributos aquí según tus necesidades
                };
              })
          );

          Promise.all(promises).then((pokemonData) => {
            setPokemons(pokemonData);
          });
        });
    }
  }, [selectedType]);

  return (
    <>
      <Sidebar pokemonTypes={pokemonTypes} setSelectedType={setSelectedType} />
      <MainView />
    </>
  );
}

export default App;
