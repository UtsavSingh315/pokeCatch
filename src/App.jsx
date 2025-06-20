// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
// import {useDispatch, useSelector} from "react-redux";
// import {store } from "../src/redux/store"
// import { increment, decrement } from './redux/actions';
import ShowPokemon from "./components/ShowPokemon";
import CatchPokemon from "./components/CatchPokemon";
import CallPokemon from "./components/CallPokemon";
function App() {
  // const dispatch = useDispatch()
  // const counterValue = useSelector((state) => state.value)

  if (typeof window !== "undefined") {
    window.addEventListener("copy", (e) => e.preventDefault());
    window.addEventListener("cut", (e) => e.preventDefault());
    window.addEventListener("paste", (e) => e.preventDefault());

    window.addEventListener("keydown", (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "x", "v", "a", "s", "z", "y"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
    });
  }

  if (typeof window !== "undefined") {
    window.addEventListener("selectstart", (e) => e.preventDefault());
  }

  return (
    <>
      <div className="flex flex-col ">
        <CatchPokemon />
        <ShowPokemon />
        <CallPokemon />
      </div>
    </>
  );
}

export default App;
