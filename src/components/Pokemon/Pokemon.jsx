import React from 'react';
import './Pokemon.css'

function Pokemon({ name, image }) {
    return (
        <div className='pokemon'>
            <img src={image} alt={name} />
            <div className='pokemon-img'>{name}</div>
        </div>
    );
}

export default Pokemon;
