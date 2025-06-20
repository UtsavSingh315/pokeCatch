import React from "react";
import { useDispatch } from "react-redux";
import { updatePokemon } from "../redux/catchedPokemon.slice";
import { getRandomPokemon, getRandomPokemons } from "../utils/randomPokemon";
import PokemonCard from "./PokemonCard";
const TIMER_MAX = 5;
const POKEMON_COUNT = 3;

const CatchPokemon = () => {
  const [timer, setTimer] = React.useState(TIMER_MAX);
  const [intervalId, setIntervalId] = React.useState(null);
  const [currentPokemons, setCurrentPokemons] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [notification, setNotification] = React.useState(null);
  const inputRef = React.useRef(null);
  const dispatch = useDispatch();



  React.useEffect(() => {
    getRandomPokemons(POKEMON_COUNT).then(setCurrentPokemons);
    setTimer(TIMER_MAX);

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          getRandomPokemons(POKEMON_COUNT).then(setCurrentPokemons);
          setInput("");
          return TIMER_MAX;
        }
      });
    }, 1000);
    setIntervalId(id);

    return () => {
      clearInterval(id);
    };
  }, []);

  React.useEffect(() => {
    if (!input.trim() || currentPokemons.length === 0) return;
    const matched = currentPokemons.find(
      (poke) => input.trim().toLowerCase() === poke.name.toLowerCase()
    );
    if (matched) {
      dispatch(updatePokemon(matched));
      setNotification(`You caught ${matched.name} !!!`);
      setTimeout(() => setNotification(null), 1000); 
      setInput("");
      getRandomPokemon().then((newPoke) => {
        setCurrentPokemons((prev) =>
          prev.map((poke) => (poke.id === matched.id ? newPoke : poke))
        );
      });
    }
  }, [input, currentPokemons, dispatch]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-[60vh] md:min-h-[80vh] border-b-4 border-amber-400 px-2 sm:px-0 pt-8"
      onClick={() => {
        if (inputRef.current) inputRef.current.focus();
      }}>
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-amber-200 text-black border-b-4 border-amber-400 px-4 py-1 rounded-md capitalize opacity-75">
          {notification}
        </div>
      )}
      <h1 className="text-2xl md:text-4xl font-extrabold text-amber-400 mb-1 text-center break-words leading-tight">
        Gotta Type 'Em All!
      </h1>
      <h2 className="text-sm md:text-xl text-neutral-600 mb-6 text-center font-medium">
        Catch Pokémon by typing their names fast. <br />
        Sharpen your typing speed and Pokémon knowledge!
      </h2>
      <div className="mb-4 w-full max-w-md">
        <div className="w-full h-1 bg-gray-200 overflow-hidden mt-2 rounded">
          <div
            className="h-full"
            style={{
              width: `${(timer / TIMER_MAX) * 100}%`,
              backgroundColor:
                timer <= 1 ? "#ef4444" : timer <= 2 ? "#f59e42" : "#22c55e",
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>
      <div className="flex flex-row gap-4 sm:gap-8 justify-center items-start w-full max-w-3xl">
        {currentPokemons.map((currentPokemon) => (
          <PokemonCard 
            pokemon={currentPokemon}
            key={currentPokemon.id}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56"
            typeRef={inputRef}
          />
        ))}
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 flex w-full max-w-xs">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="type name to catch"
          className="outline-none border-none text-lg sm:text-xl text-center font-bold rounded px-2 py-1 mx-auto uppercase w-full"
          autoFocus
          style={{ textTransform: "uppercase" }}
        />
      </form>
    </div>
  );
};

export default CatchPokemon;
