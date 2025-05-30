import { useContext } from 'react';
import Pokecard from '../components/Pokecard';
import { PokemonContext } from '../context/PokemonProvider';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import bg from '../assets/img/bg-pokemon.png'

const Home = () => {
    const {
        pokemonList,
        typesList,
        searchQuery,
        setSearchQuery,
        selectedType,
        setSelectedType,
        currentPage,
        setCurrentPage,
        totalPages,
        fetchPokemonData
    } = useContext(PokemonContext);

    const handlePage = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearchButtonClick = async () => {
        const query = searchQuery
        await fetchPokemonData(query, selectedType, currentPage);
    };

    return (
        <div className='relative min-h-screen'>
            {/* Optional pattern layer */}
            <div className="absolute inset-0 opacity-60 ">
                <img src={bg} alt="" className='min-w-full h-full object-cover'/>
            </div>

            {/* Actual page content */}
            <div className='relative px-3 pb-10'>
                <div className='pt-32'>
                    {/* Search & Filter */}
                    <div className='flex flex-col lg:flex-row justify-around'>
                        <div className='z-50 flex items-center justify-center'>
                            <input
                                type="text"
                                placeholder='Search for a Pokémon by name'
                                className='outline outline-black w-md p-2 rounded-xl mx-3'
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <button
                                onClick={handleSearchButtonClick}
                                className='py-1 pb-2 px-4 rounded-xl bg-red-500 text-white font-pokemon tracking-widest cursor-pointer'
                            >
                                Search
                            </button>
                        </div>

                        <div className='z-50 flex justify-center mx-5 my-4'>
                            <select
                                name="Type"
                                value={selectedType}
                                onChange={(e) => {
                                    setSelectedType(e.target.value);
                                    fetchPokemonData(searchQuery, e.target.value, 1);
                                }}
                                className='border p-2 rounded-xl outline-red-600'
                            >
                                <option value="">Select a type</option>
                                {typesList.map((type, index) => (
                                    <option value={type} key={index}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Pokémon Grid */}
                    <div className={`${pokemonList.length > 0
                        ? 'my-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 px-3 sm:px-5 md:px-10 justify-items-center'
                        : 'flex justify-center px-3 py-2 min-h-[50vh]'
                        }`}>
                        {pokemonList.length > 0 ? (
                            pokemonList.map((poke) => (
                                <Pokecard key={poke.id} pokemon={poke} />
                            ))
                        ) : (
                            <p className='font-bold text-xl'>Loading Pokemons....</p>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center px-5 mt-10 gap-2 items-center">
                            <button
                                onClick={() => handlePage(currentPage - 1)}
                                className='py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400 disabled:opacity-50'
                                disabled={currentPage === 1}
                            >
                                <FaAngleLeft />
                            </button>

                            <button
                                onClick={() => handlePage(1)}
                                className={`py-2 px-3 rounded-xl ${currentPage === 1 ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                1
                            </button>

                            {currentPage > 3 && <span className='px-2'>...</span>}

                            {Array.from({ length: 2 }, (_, i) => {
                                let page = Math.max(2, currentPage - 1) + i;
                                if (page >= totalPages) return null;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePage(page)}
                                        className={`py-2 px-3 rounded-xl ${page === currentPage ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            {currentPage < totalPages - 2 && <span className='px-2'>...</span>}

                            <button
                                onClick={() => handlePage(totalPages)}
                                className={`py-2 px-3 rounded-xl ${currentPage === totalPages ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                            >
                                {totalPages}
                            </button>

                            <button
                                onClick={() => handlePage(currentPage + 1)}
                                className='py-2 px-4 bg-gray-300 rounded-xl hover:bg-gray-400 disabled:opacity-50'
                                disabled={currentPage === totalPages}
                            >
                                <FaAngleRight />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
