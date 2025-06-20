import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PokemonCard from './PokemonCard';
import { getRandomPokemon } from '../utils/randomPokemon';
import { updatePokemon } from '../redux/index';

const CallPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const controllerRef = useRef(new AbortController());
  const dispatch = useDispatch();

  const fetchRandomPokemon = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create a new controller for each request
      controllerRef.current = new AbortController();
      const signal = controllerRef.current.signal;
      
      const randomPokemon = await getRandomPokemon(signal);
      setPokemon(randomPokemon);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching Pokemon:', err);
        setError('Failed to fetch Pokemon');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAbort = () => {
    if (loading) {
      controllerRef.current.abort();
      setLoading(false);
      setError('Request canceled');
    }
  };

  const handleCatch = () => {
    if (pokemon) {
      dispatch(updatePokemon(pokemon));
      setPokemon(null);
      // Show a success message or notification
      // alert(`You caught ${pokemon.name}!`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 p-4">
      <h2 className="text-2xl font-bold mb-6 text-amber-400">Random Pokémon Generator</h2>
      
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400"></div>
          <p className="mt-4">Searching for Pokémon...</p>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : pokemon ? (
        <div className="flex flex-col items-center">
          <PokemonCard pokemon={pokemon} className="w-60" />
          <div className="mt-6 flex gap-4">
            <button 
              className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 rounded-md transition-colors"
              onClick={handleCatch}>
              Catch this Pokémon
            </button>
            <button 
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md transition-colors"
              onClick={fetchRandomPokemon}>
              Find another
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-gray-600">Click the button below to find a random Pokémon!</p>
          <button 
            className="bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 rounded-md transition-colors"
            onClick={fetchRandomPokemon}>
            Find Random Pokémon
          </button>
        </div>
      )}
      
      {loading && (
        <button  
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors" 
          onClick={handleAbort}>
          Cancel Search
        </button>
      )}
    </div>
  );
};

export default CallPokemon;