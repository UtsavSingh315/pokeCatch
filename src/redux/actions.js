export const increment = (val) => { return {type: 'counter/incremented', payload: val} }
export const decrement = (val) => { return {type: 'counter/decremented', payload: val} }

export const setPokemon = (pokemon) => { return {type:'pokemon/update', payload: pokemon} }