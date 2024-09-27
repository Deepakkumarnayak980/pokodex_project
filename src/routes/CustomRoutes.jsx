import { Routes,Route } from "react-router-dom";
import Pokemon_Details from "../components/PokemonDetails/Pokemon_Details";
import Pokedex from "../components/Pokedex/Pokedex";


function CustomRoutes() {
    return (
        <Routes >
            <Route path="/"
             element={<Pokedex/>} />
           <Route path="/pokemon/:id" element={<Pokemon_Details/>} />
        </Routes>
    );
}

export default CustomRoutes;
