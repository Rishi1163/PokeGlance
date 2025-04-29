import { useEffect, useState } from 'react'
import { TbPokeball } from "react-icons/tb";
import Pokecard from './components/Pokecard';
import axios from 'axios';

function App() {

  const [searchQuery, setSearchQuery] = useState('')
  const [pokemonlist, setPokemonlist] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [selectedtype, setSelectedtype] = useState('')
  const [typeslist, setTypeslist] = useState([])

  useEffect(() => {
    const pokemonData = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
        const result = res.data.results
        // console.log(result)

        const detailedPokemon = await Promise.all(
          result.map(async (poke) => {
            const pokeDetails = await axios.get(poke.url)
            // console.log(pokeDetails)
            return {
              name: pokeDetails.data.name,
              id: pokeDetails.data.id,
              image: pokeDetails.data.sprites.front_default,
              types: pokeDetails.data.types.map(type => type.type.name)
            }
          })
        )
        setPokemonlist(detailedPokemon)
        setFilteredList(detailedPokemon)

        //get all the types
        const allTypes = new Set()
        detailedPokemon.forEach(pokemon => {
          pokemon.types.forEach(type => allTypes.add(type))
        })
        setTypeslist(Array.from(allTypes))
      } catch (error) {
        console.log("Erroring fetching pokemon details", error)
      }
    }
    pokemonData()
  }, [])

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleTypeChange = (e) => {
    setSelectedtype(e.target.value)
  }

  const handleSearch = () => {
    let filtered = pokemonlist;  // <-- start from full list

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((poke) =>
        poke.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedtype !== "") {
      filtered = filtered.filter((poke) =>
        poke.types.includes(selectedtype)
      );
    }

    setFilteredList(filtered);
  }

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedtype]);

  return (
    <div className='h-screen px-3'>
      <header className='flex justify-center py-2 mb-3'>
        <p className=' text-xl md:text-5xl flex gap-2 font-bold font-pokemon md:gap-3 tracking-widest'><span className='text-red-500'>Pokemon</span> search</p>
      </header>

      <div className='flex items-center justify-center'>
        <input type="text" placeholder='Search for a pokemon by name' className='border w-md p-2 rounded-xl outline-red-600 mx-3' onChange={handleInputChange} value={searchQuery} />
        <button onClick={handleSearch} className='py-2 px-4 rounded-xl bg-red-500 text-white'>Search</button>
      </div>

      <div className='flex justify-center mx-5 my-4'>
        <select name="Type" value={selectedtype} onChange={handleTypeChange} className='border p-2 rounded-xl outline-red-600'>
          <option value="">Select a type</option>
          {typeslist.map((type, index) => (
            <option value={type} key={index}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={`${filteredList.length > 0
        ? 'my-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 min-h-[75vh] max-h-[75vh] overflow-y-auto px-3 py-2 gap-3'
        : 'flex justify-center min-h-[75vh] px-3 py-2'
        }`}>
        {filteredList.length > 0 ? (
          filteredList.map((poke) => (
            <Pokecard key={poke.id} pokemon={poke} />
          ))
        ) : (
          <p className='font-bold text-xl'>No Pokémon found. Try searching!</p>
        )}
      </div>

    </div>
  )
}

export default App