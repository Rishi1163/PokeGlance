import React from 'react'

const Pokecard = ({ pokemon }) => {

    console.log(pokemon)
    return (
        <div>
            <div className="bg-white border border-gray-400 shadow-md rounded-xl p-4 text-center hover:scale-105 transition-transform md:max-h-[14rem]">
                <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto" />
                <h3 className="text-lg font-bold capitalize mt-2">{pokemon.name}</h3>
                <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
                <div className="flex justify-center gap-2 mt-2 flex-wrap">
                    {pokemon.types.map((type, index) => (
                        <span
                            key={index}
                            className="text-xs bg-red-100 text-red-600 rounded-full px-3 py-1 capitalize"
                        >
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Pokecard
