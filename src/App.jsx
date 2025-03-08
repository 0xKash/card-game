import { useEffect, useState } from "react";

// COMPONENTS

import { Card } from "./components/card";
import { FinalMsg } from "./pages/finalMsg";

// FUNCTIONS

import { randomInt } from "./utils/randomInt";
import { shuffleArray } from "./utils/shuffleArr";
import { checkGame } from "./utils/gameLogic";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [gameStatus, setGameStatus] = useState(true);
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
          clicked: false,
        };
      });

      setPokemons(await Promise.all(newPokemons));
    };

    gameStatus && getPokemons();
  }, [gameStatus]);

  return (
    <>
      <h1>{`${count}/8`}</h1>

      {count < 8 ? (
        gameStatus ? (
          <div id="card-wrapper">
            {pokemons.map((pokemon) => (
              <Card
                key={pokemon.id}
                src={pokemon.img}
                action={() => {
                  setPokemons(shuffleArray(pokemons));
                  setGameStatus(checkGame(pokemon));
                  pokemon.clicked ? null : setCount(count + 1);
                  pokemon.clicked = true;
                }}
              />
            ))}
          </div>
        ) : (
          <FinalMsg
            msg={"YOU LOST!"}
            action={() => {
              setGameStatus(true);
              setCount(0);
            }}
          />
        )
      ) : (
        <FinalMsg
          msg={"YOU WON!"}
          action={() => {
            setGameStatus(true);
            setCount(0);
          }}
        />
      )}
    </>
  );
}

export default App;
