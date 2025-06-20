import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catched: [
    {
      id: 25,
      name: "pikachu",
      weight: 60,
      height: 4,
      types: ["Electric", "Rodent"],
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
  ],
  lastCatched: {
    id: 25,
    name: "pikachu",
    weight: 60,
    height: 4,
    types: ["Electric", "Rodent"],
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  },
};

const catchedPokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    updatePokemon: (state, action) => {
      state.catched.push({
        id: action.payload.id,
        name: action.payload.name,
        weight: action.payload.weight,
        height: action.payload.height,
        types: action.payload.types,
        image: action.payload.image,
      });
      state.lastCatched = {
        id: action.payload.id,
        name: action.payload.name,
        weight: action.payload.weight,
        height: action.payload.height,
        types: action.payload.types,
        image: action.payload.image,
      };
    },
  },
});

export const { updatePokemon } = catchedPokemonSlice.actions;
export default catchedPokemonSlice.reducer;
