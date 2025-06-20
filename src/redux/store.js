import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import pokemonReducer from "./catchedPokemon.slice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedPokemonReducer = persistReducer(persistConfig, pokemonReducer);

export const store = configureStore({
  reducer: {
    pokemon: persistedPokemonReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
