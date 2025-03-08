import { useEffect, useState } from "react";

import { Card } from "./components/card";

import { randomInt } from "./utils/randomInt";

import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const API_KEY = `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${randomInt()}`;

    const getPokemons = async () => {
      const response = await fetch(API_KEY);
      const data = await response.json();
      const { results } = data;

      const newPokemons = results.map(async (element) => {
        const response = await fetch(element.url);
        const data = await response.json();

        return {
          id: data.id,
          name: data.name,
          img: data.sprites.other.dream_world.front_default,
        };
      });

      setPokemons(await Promise.all(newPokemons));
      console.log();
    };

    getPokemons();
  }, []);

  console.log(pokemons);

  return (
    <>
      <h1>Card game!</h1>
      <div id="card-wrapper">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} src={pokemon.img} />
        ))}
      </div>
    </>
  );
}

export default App;

// data.sprites.other.dream_world.front_default
// "https://pokeapi.co/api/v2/pokemon?limit=8&offset=0"
