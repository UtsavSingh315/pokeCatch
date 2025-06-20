// import React from 'react'
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";

const ShowPokemon = () => {
  const catchedPokemons = useSelector((state) => state.pokemon.catched);
  const lastCatchedPokemon = useSelector((state) => state.pokemon.lastCatched);
  const randomNumber = () => Math.floor(Math.random() * 1026) + 1;

  // console.log(catchedPokemons);
  // console.log(lastCatchedPokemon.types);
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
      <div className="grid  grid-cols-3 md:grid-cols-8 min-grid-rows-4 gap-4 h-screen  ">
        {[...catchedPokemons].reverse().map((pokemon) => (
          <PokemonCard pokemon={pokemon} className={"h-80 pb-4"} key={randomNumber()}/>
        ))}
      </div>
    </div>
  );
};

export default ShowPokemon;
