import React from 'react';
import './Pokemon.css'
import { Link } from 'react-router-dom'; 

function Pokemon({ name, image,id }) {
    return (
        <div className='pokemon'>
           <Link to={`/pokemon/${id}`}>
            <img src={image} alt={name} />
            <div className='pokemon-img'>{name}</div>
          </Link>
        </div>
    );
}

export default Pokemon;
