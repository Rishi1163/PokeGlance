import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getGradientByType, typeSolidColors } from '../utils/pokemonUtils'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import bg from '../assets/img/bg-pokemon.png'

const Details = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const navigate = useNavigate()
  const [addToWishlist, setAddToWishlist] = useState(false)

  //to get the selected pokemon details
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(res.data)
        // console.log(res.data)
      } catch (error) {
        console.log("Error getting the pokemon", error)
      }
    }
    fetchPokemon()
  }, [id])

  const getStat = (statName) => {
    const stat = pokemon.stats.find((s) => s.stat.name === statName)
    return stat ? stat.base_stat : 'N/A';
  }

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
    setAddToWishlist(wishlist.includes(Number(id)))
  }, [id])

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    if (wishlist.includes(Number(id))) {
      wishlist = wishlist.filter(pokeId => pokeId !== Number(id))
    } else {
      wishlist.push(Number(id))
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
    setAddToWishlist(prev => !prev);
  };

  if (!pokemon) return <p className='flex justify-center items-center text-xl'>Loading...</p>;

  //to add the gradient background
  const typeGradient = getGradientByType(pokemon.types.map(t => t.type.name))
  // console.log(typeGradient)
  return (
    <div className="min-h-screen pt-28 p-4 bg-gradient-to-r from-slate-100 to-purple-100 flex flex-col items-center">
      <div className="absolute inset-0 opacity-60 ">
        <img src={bg} alt="" className='min-w-full h-full object-cover' />
      </div>
      <button onClick={() => navigate(-1)} className="self-start mb-4 px-4 py-2 bg-white rounded-full shadow hover:bg-gray-100 relative z-10">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-center ">
        <div className="bg-[#1a1a2e] rounded-xl p-4 shadow-lg relative">
          <button
            className='absolute top-2 right-2 p-2 rounded-full cursor-pointer z-50'
            onClick={toggleWishlist}>
            {addToWishlist ? <FaHeart size={25} className='text-red-700' /> : <FaRegHeart size={25} className='text-white' />}
          </button>
          <div
            className={`absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-100 z-0 bg-gradient-to-br ${typeGradient}`}
          ></div>

          {/* Image above */}
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-60 relative z-10" />
        </div>

        {/* Info Section */}
        <div className="text-left px-3 relative z-10">
          <h2 className="text-4xl capitalize font-bold font-pokemon tracking-widest mb-4">{pokemon.name}</h2>

          {/* Types */}
          <div className="mb-2 mt-5">
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t, i) => {
              const typeClass = typeSolidColors[t.type.name] || 'bg-gray-400 text-white'; // fallback color
              return (
                <span key={i} className={`inline-block ${typeClass} px-3 py-1 rounded-full mr-2 capitalize`}>
                  {t.type.name}
                </span>
              );
            })}
          </div>

          {/* Abilities */}
          <div className="mb-4">
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a, i) => (
              <span key={i} className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded-full mr-2 font-bold">
                {a.ability.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-md">
            {pokemon.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="text-lg font-bold">{stat.base_stat}</p>
                <p className="text-sm text-gray-600 capitalize">{stat.stat.name.replace('-', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
