import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getGradientByType } from '../utils/pokemonUtils'

const Pokecard = ({ pokemon }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/details/${pokemon.id}`)
    }

    const typeGradient = getGradientByType(pokemon.types)
    // console.log('Primary type:', pokemon.types?.[0]);
    // console.log('Gradient:', typeGradient);
    console.log('Types array full:', pokemon.types);

    console.log(pokemon)
    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer bg-[#1a1a2e] text-white rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-200 lg:w-60 lg:h-48 w-40 h-32 flex flex-col justify-end relative mt-8 `}
        >
            <div
                className={`absolute top-3 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-60 z-0 bg-gradient-to-br ${typeGradient}`}
            ></div>

            <div >
                <img src={pokemon.image || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'} alt={pokemon.name} className="lg:w-52 lg:h-52 w-32 h-38 absolute -top-14" />
            </div>
            <h3 className="mt-auto mx-auto text-sm font-pokemon tracking-[0.3rem] font-semibold capitalize flex justify-end">{pokemon.name}</h3>
        </div>
    )
}

export default Pokecard
