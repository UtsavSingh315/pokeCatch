import React from "react";
import { useDispatch } from "react-redux";
import { setPokemon } from "../redux/actions";

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

  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 1026) + 1;
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
    const pokemon = await data.json();
    const poke = {
      id: pokemon.id,
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types.map((type) => type.type.name),
      image: pokemon.sprites.other["official-artwork"].front_default,
    };
    return poke;
  };

  const getRandomPokemons = async () => {
    const pokemons = [];
    const usedIds = new Set();
    while (pokemons.length < POKEMON_COUNT) {
      const poke = await getRandomPokemon();
      if (!usedIds.has(poke.id)) {
        pokemons.push(poke);
        usedIds.add(poke.id);
      }
    }
    return pokemons;
  };

  React.useEffect(() => {
    getRandomPokemons().then(setCurrentPokemons);
    setTimer(TIMER_MAX);

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          getRandomPokemons().then(setCurrentPokemons);
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
      dispatch(setPokemon(matched));
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

  const getHighlightedName = (name) => {
    const inputLower = input.trim().toLowerCase();
    let result = [];
    for (let i = 0; i < name.length; i++) {
      if (i < inputLower.length && name[i].toLowerCase() === inputLower[i]) {
        result.push(
          <span key={i} style={{ color: "#eab308", fontWeight: "bold" }}>
            {name[i].toUpperCase()}
          </span>
        );
      } else {
        result.push(<span key={i}>{name[i].toUpperCase()}</span>);
      }
    }
    return result;
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
          <div
            key={currentPokemon.id}
            className="p-3 sm:p-4 flex flex-col items-center md:bg-neutral-800 rounded-xl shadow-lg w-full sm:w-72">
            <img
              src={currentPokemon.image}
              alt={currentPokemon.name}
              className="h-32 sm:h-48 object-contain"
            />
            <br />
            <h1 className="text-xs md:text-lg font-bold text-center">
              <span className="text-xs text-gray-500">
                #{currentPokemon.id}
              </span>{" "}
              - <span>{getHighlightedName(currentPokemon.name)}</span>
              <p className="text-[0.6rem] sm:text-base italic text-gray-500">
                {currentPokemon.weight / 10} Kg - {currentPokemon.height * 10}{" "}
                cm
              </p>
            </h1>
            <div className="mt-2 hidden md:flex flex-wrap justify-center">
              {currentPokemon.types.map((type) => (
                <p
                  key={type}
                  className="p-1 rounded-2xl px-2.5 bg-neutral-600 text-gray-900 inline mx-1 capitalize md:text-base text-xs">
                  {type}
                </p>
              ))}
            </div>
          </div>
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
