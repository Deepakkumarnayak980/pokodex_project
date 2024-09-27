import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PokemonDetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({}); // Initialize state

    // Define the async function to fetch data
    const downloadPokemon = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            setPokemon({
                name: response.data.name,
                image: response.data.sprites.other.dream_world.front_default, // Fixed typo
                weight: response.data.weight,
                types: response.data.types.map((t) => t.type.name) // Map types
            });
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    };

    // useEffect to fetch data on component mount
    useEffect(() => {
        downloadPokemon(); // Call the async function inside useEffect
    }, [id]); // Include 'id' as a dependency so it refetches when ID changes

    return (
        <div>
            <h2>{pokemon.name}</h2>
            {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types && pokemon.types.join(', ')}</p>
        </div>
    );
}

export default PokemonDetails;
