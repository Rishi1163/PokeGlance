import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
    const [pokemonList, setPokemonList] = useState([]);  // Paginated + filtered list
    const [typesList, setTypesList] = useState([]);      // All available types

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 15;

    // 🔹 Get all available types only once
    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/type`);
                setTypesList(res.data.results.map(type => type.name));
            } catch (error) {
                console.log("Error fetching types", error);
            }
        };
        fetchTypes();
    }, []);

    // 🔹 Main fetch Pokémon logic (with pagination, filter, search)
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(currentPage - 1) * limit}`;
                let pokemons = [];

                if (selectedType) {
                    // When type is selected -> get Pokémon of that type only
                    const res = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
                    let filtered = res.data.pokemon.map(p => p.pokemon);

                    if (searchQuery.trim()) {
                        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
                    }

                    // Paginate manually on filtered results
                    setTotalPages(Math.ceil(filtered.length / limit));
                    const paginated = filtered.slice((currentPage - 1) * limit, currentPage * limit);

                    pokemons = await Promise.all(
                        paginated.map(async (poke) => {
                            const pokeDetails = await axios.get(poke.url);
                            return {
                                name: pokeDetails.data.name,
                                id: pokeDetails.data.id,
                                image: pokeDetails.data.sprites.other["official-artwork"].front_default,
                                types: pokeDetails.data.types.map(t => t.type.name),
                            };
                        })
                    );
                } else if (searchQuery.trim()) {
                    // When only searching (by name), try to get that specific Pokémon directly
                    try {
                        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
                        pokemons = [{
                            name: res.data.name,
                            id: res.data.id,
                            image: res.data.sprites.other["official-artwork"].front_default,
                            types: res.data.types.map(t => t.type.name),
                        }];
                        setTotalPages(1);
                    } catch {
                        pokemons = [];
                        setTotalPages(0);
                    }
                } else {
                    // Default paginated listing (all Pokémon)
                    const res = await axios.get(url);
                    const result = res.data.results;

                    pokemons = await Promise.all(
                        result.map(async (poke) => {
                            const pokeDetails = await axios.get(poke.url);
                            return {
                                name: pokeDetails.data.name,
                                id: pokeDetails.data.id,
                                image: pokeDetails.data.sprites.other["official-artwork"].front_default,
                                types: pokeDetails.data.types.map((t) => t.type.name),
                            };
                        })
                    );
                    setTotalPages(Math.ceil(1150 / limit));
                }

                setPokemonList(pokemons);

            } catch (error) {
                console.log("Error fetching Pokémon", error);
            }
        };

        fetchPokemon();
    }, [searchQuery, selectedType, currentPage]);

    return (
        <PokemonContext.Provider value={{
            pokemonList,
            typesList,
            searchQuery,
            setSearchQuery,
            selectedType,
            setSelectedType,
            currentPage,
            setCurrentPage,
            totalPages
        }}>
            {children}
        </PokemonContext.Provider>
    );
};

export { PokemonProvider };