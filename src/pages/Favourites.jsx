import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { getGradientByType, typeSolidColors } from '../utils/pokemonUtils'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import bg from '../assets/img/bg-pokemon.png'

const Details = () => {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const navigate = useNavigate()
  const [addToWishlist, setAddToWishlist] = useState(false)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon(res.data)
      } catch (error) {
        console.log("Error getting the pokemon", error)
      }
    }
    fetchPokemon()
  }, [id])

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
    setAddToWishlist(prev => !prev)
  }

  if (!pokemon) return <p className='flex justify-center items-center h-screen text-2xl'>Loading...</p>

  const typeGradient = getGradientByType(pokemon.types.map(t => t.type.name))

  return (
    <div className="min-h-screen pt-28 p-4 bg-gradient-to-r from-slate-100 to-purple-100 flex flex-col items-center relative">
      <div className="absolute inset-0 opacity-96">
        <img src={bg} alt="" className='min-w-full h-full object-cover select-none'/>
      </div>

      {/* Back Button updated */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 px-5 py-2 bg-white/70 text-gray-800 rounded-full shadow-md hover:bg-white/90 backdrop-blur-lg transition-all"
      >
        ← Back
      </button>

      {/* Main Card */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center bg-white/80 p-10 rounded-3xl shadow-2xl backdrop-blur-lg max-w-5xl w-full">
        {/* Pokémon Image Block */}
        <div className="relative bg-[#1a1a2e] rounded-2xl p-6 shadow-lg w-80 h-80 flex items-center justify-center">
          <button
            className='absolute top-3 right-3 p-2 rounded-full cursor-pointer bg-white/20 hover:bg-white/40 backdrop-blur-md'
            onClick={toggleWishlist}>
            {addToWishlist ? <FaHeart size={28} className='text-red-600' /> : <FaRegHeart size={28} className='text-white' />}
          </button>
          <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-2xl opacity-90 z-0 bg-gradient-to-br ${typeGradient}`}></div>
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-64 relative z-10" />
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <h2 className="text-5xl capitalize font-bold font-pokemon tracking-wide mb-6">{pokemon.name}</h2>

          <div className="mb-4">
            <strong>Types:</strong>{" "}
            {pokemon.types.map((t, i) => {
              const typeClass = typeSolidColors[t.type.name] || 'bg-gray-400 text-white'
              return (
                <span key={i} className={`inline-block ${typeClass} px-4 py-1 rounded-full mr-3 capitalize text-lg`}>
                  {t.type.name}
                </span>
              )
            })}
          </div>

          <div className="mb-8">
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities.map((a, i) => (
              <span key={i} className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full mr-3 text-md">
                {a.ability.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 bg-white/70 p-6 rounded-2xl shadow-lg backdrop-blur-md">
            {pokemon.stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="text-2xl font-bold">{stat.base_stat}</p>
                <p className="text-sm text-gray-700 capitalize">{stat.stat.name.replace('-', ' ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
