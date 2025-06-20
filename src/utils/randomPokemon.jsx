import axios from "axios";
import { store } from "../redux/store";

// Get pokemon IDs from the store
const getPokemonInStore = () => {
  return store.getState().pokemon.catched.map(pokemon => pokemon.id);
};

const API_URL = "https://pokeapi.co/api/v2/";
const api = axios.create({
  baseURL: API_URL,
});

// api.interceptors.request.use((request) => {
//   console.log("Request made with ", request);
//   return request;
// }, (error) => {
//   console.error("Request Error:", error);
// });


// api.interceptors.response.use(
//   (response) => {
//     const pokemonInStore = getPokemonInStore();
//     if (pokemonInStore.includes(response.data.id)) {
//       // Generate a new random ID that isn't in the store
//       let randomId;
//       do {
//         randomId = Math.floor(Math.random() * 1026) + 1;
//       } while (pokemonInStore.includes(randomId));
      
//       const res = api.get(`pokemon/${randomId}`, { signal: response.config.signal });
//       return res;
//     }  
//     return response;
//   },
//   (error) => {
//     console.error("API Error:", error);
//   }
// );


export const getRandomPokemon = async (signal) => {
    const randomId = Math.floor(Math.random() * 1026) + 1;
    const res = await api.get(`pokemon/${randomId}`, { signal });
    const pokemon = res.data;
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


export const getRandomPokemons = async (numberOfPokemons) => {
    const pokemons = [];
    for (let i = 0; i < numberOfPokemons; i++) {
      const poke = await getRandomPokemon();
      pokemons.push(poke);
    }
    return pokemons;
  };



