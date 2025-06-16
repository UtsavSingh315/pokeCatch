import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
const rootReducer = combineReducers({
  // counter: counterReducer,
  pokemon: pokemonReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function pokemonReducer(
  state = {
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
  },
  action
) {
  switch (action.type) {
    case "pokemon/update":
      return {
        catched: [
          ...state.catched,
          {
            id: action.payload.id,
            name: action.payload.name,
            weight: action.payload.weight,
            height: action.payload.height,
            types: action.payload.types,
            image: action.payload.image,
          },
        ],
        lastCatched: {
          id: action.payload.id,
          name: action.payload.name,
          weight: action.payload.weight,
          height: action.payload.height,
          types: action.payload.types,
          image: action.payload.image,
        },
      };

    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

let persistor = persistStore(store);

export { store, persistor };
