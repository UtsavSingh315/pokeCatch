import React from 'react'

import { getHighlightedName } from "../utils/getHighlightedName";
  
  



const PokemonCard = ({pokemon, className, typeRef}) => {
  return (
    <div className={`p-4 flex flex-col items-center rounded-2xl bg-neutral-800 ${className}`} >
            <img src={pokemon.image} alt={pokemon.name} />
            <br />
            <h1 className="text-xs md:text-lg font-bold text-center">
              <span className="text-xs text-gray-500">
                #{pokemon.id}
              </span>{" "}
              - {typeRef != null ? <span>{getHighlightedName(pokemon.name, typeRef)}</span> : pokemon.name}
              <p className="text-[0.6rem] sm:text-base italic text-gray-500">
                {pokemon.weight / 10} Kg - {pokemon.height * 10}{" "}
                cm
              </p>
            </h1>
            <div className="mt-2 hidden md:flex flex-wrap justify-center">
              {pokemon.types.map((type) => (
                // <p className="p-1 text-xs md:text-base rounded-2xl px-2.5 bg-neutral-600 text-gray-900 inline mx-2">
                <p className="p-1 text-xs capitalize rounded-2xl px-2 bg-neutral-600 inline mx-1" key={type}>
                  {" "}
                  {type}{" "}
                </p>
              ))}
            </div>
          </div>
  )
}

export default PokemonCard