
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokeminList.css';
import Pokemon from '../Pokemon/Pokemon';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemons() {
        try {
            const response = await axios.get(pokedexUrl); // Fetch list of 20 pokemons
            const pokemonResults = response.data.results || []; // Ensure results is an array
            
            // Set next and previous URLs
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);

            // Iterate over the array of pokemons and use their URL to create promises
            const pokemonResultsPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

            // Await all promises
            const pokemonData = await axios.all(pokemonResultsPromise);
            console.log(pokemonData);

            // Iterate on the data of each pokemon and extract id, name, image, and types
            const results = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.other?.dream_world?.front_default || pokemon.sprites.front_shiny,
                    types: pokemon.types,
                };
            });

            setPokemonList(results);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
        }
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokedexUrl]);

    return (
        <div className='pokemon-list-wrapper'>
            <div>Pokemon List</div>
            <div className='pokemon-wrapper'>
                {isLoading ? 'Loading....' : 
                    pokemonList.map((p) => (
                        <Pokemon name={p.name} image={p.image} key={p.id} />
                    ))
                }
            </div>
            <div className='controls'>
                <button disabled={!prevUrl} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={!nextUrl} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
