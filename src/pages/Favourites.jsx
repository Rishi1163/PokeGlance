import axios from 'axios';
import React, { useEffect, useState } from 'react'
import bg from '../assets/img/bg-pokemon.png'
import Pokecard from '../components/Pokecard';
import noPoke from '../assets/img/Psyduck.png'

const Favourites = () => {

  const [wishlistPokemons, setWishlistPokemons] = useState([]);

  useEffect(() => {
    const fetchWishlistPokemons = async () => {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      try {
        const promises = wishlist.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
        const results = await Promise.all(promises);
        setWishlistPokemons(results.map(res => res.data));
      } catch (error) {
        console.log("Error fetching wishlist pokemons", error);
      }
    };
    fetchWishlistPokemons();
  }, []);

  return (
    <div className='min-h-screen pt-28 px-5 relative'>
      <div className="absolute inset-0 opacity-60 ">
        <img src={bg} alt="" className='min-w-full h-full object-cover' />
      </div>
      <h2 className='text-3xl lg:text-5xl font-bold mb-6 font-pokemon pokemon-text relative z-10 tracking-wider flex justify-center'>Your PokeVault</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
        {wishlistPokemons.length > 0 ? (
          wishlistPokemons.map(poke => <Pokecard key={poke.id} pokemon={poke} />)
        ) : (
          <div className='relative z-50 font-pokemon tracking-widest flex justify-center items-center md:w-[97vw] md:h-[50vh] text-2xl flex-col md:mt-8 w-[90vw]'>
            <span className=''>
              <img src={noPoke} alt="" className='md:w-60 w-40'/>
            </span>
            <p className='text-center'>No Pokemon's in pokevault!!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favourites