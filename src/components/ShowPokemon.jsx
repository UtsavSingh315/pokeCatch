// import React from 'react'
import { useSelector } from "react-redux";

const showPokemon = () => {
  const catchedPokemons = useSelector((state) => state.pokemon.catched);
  const lastCatchedPokemon = useSelector((state) => state.pokemon.lastCatched);
  const randomNumber = () => Math.floor(Math.random() * 1026) + 1;

  console.log(catchedPokemons);
  console.log(lastCatchedPokemon.types);
  return (
    // <div className="overflow-clip">
    <div className="">
      <div className="h-40 flex justify-center items-center">
        <h2 className="text-3xl text-amber-300 text-center font-extrabold">
          <span className="text-2xl text-zinc-600">{`{${catchedPokemons.length}}`}</span>
          <br />
          Your Pokemons
        </h2>
      </div>

      {/* <div className="grid  grid-cols-2 md:grid-cols-4 min-grid-rows-4  h-screen  overflow-scroll"> */}
      <div className="grid  grid-cols-3 md:grid-cols-8 min-grid-rows-4  h-screen  ">
        {[...catchedPokemons].reverse().map((pokemon) => (
          <div className="p-4 flex flex-col items-center " key={randomNumber()}>
            <img src={pokemon.image} alt={pokemon.name} />
            <br />
            <h1 className="text-xl font-bold text-center">
              <span className="text-xs text-gray-500">#{pokemon.id}</span> -{" "}
              {pokemon.name.toUpperCase()}
              <p className="text-base italic text-[0.6rem] text-gray-500">
                {pokemon.weight / 10} Kg - {pokemon.height * 10} cm
              </p>
            </h1>
            <div className="mt-2 hidden md:flex flex-wrap justify-center">
              {pokemon.types.map((type) => (
                // <p className="p-1 text-xs md:text-base rounded-2xl px-2.5 bg-neutral-600 text-gray-900 inline mx-2">
                <p className="p-1 text-xs capitalize rounded-2xl px-2.5 bg-neutral-600  inline mx-2">
                  {" "}
                  {type}{" "}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default showPokemon;
