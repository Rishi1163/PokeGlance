export const typeColors = {
    fire: 'from-orange-400 via-orange-500 to-orange-600',
    water: 'from-blue-400 via-blue-500 to-blue-600',
    grass: 'from-green-400 via-green-500 to-green-600',
    electric: 'from-yellow-300 via-yellow-400 to-yellow-500',
    poison: 'from-purple-400 via-purple-500 to-purple-600',
    flying: 'from-cyan-300 via-cyan-400 to-cyan-500',
    bug: 'from-lime-400 via-lime-500 to-lime-600',
    normal: 'from-gray-400 via-gray-500 to-gray-600',
    ground: 'from-yellow-600 via-yellow-700 to-yellow-800',
    rock: 'from-yellow-800 via-yellow-900 to-yellow-950',
    ice: 'from-blue-200 via-blue-300 to-blue-400',
    dragon: 'from-indigo-500 via-indigo-600 to-indigo-700',
    dark: 'from-gray-700 via-gray-800 to-gray-900',
    fairy: 'from-pink-300 via-pink-400 to-pink-500',
    steel: 'from-gray-300 via-gray-400 to-gray-500',
    ghost: 'from-indigo-300 via-indigo-400 to-indigo-500',
    psychic: 'from-pink-500 via-pink-600 to-pink-700',
    fighting: 'from-red-700 via-red-800 to-red-900'
  };

  export const typeSolidColors = {
    fire: 'bg-orange-500 text-white',
    water: 'bg-blue-500 text-white',
    grass: 'bg-green-500 text-white',
    electric: 'bg-yellow-400 text-black',
    poison: 'bg-purple-600 text-white',
    flying: 'bg-cyan-400 text-black',
    bug: 'bg-lime-500 text-black',
    normal: 'bg-gray-400 text-black',
    ground: 'bg-yellow-700 text-white',
    rock: 'bg-yellow-900 text-white',
    ice: 'bg-blue-200 text-black',
    dragon: 'bg-indigo-600 text-white',
    dark: 'bg-gray-800 text-white',
    fairy: 'bg-pink-400 text-white',
    steel: 'bg-gray-500 text-white',
    ghost: 'bg-indigo-500 text-white',
    psychic: 'bg-pink-600 text-white',
    fighting: 'bg-red-800 text-white'
};

  
  export const getGradientByType = (types) => {
    const primary = types?.[0] || 'normal';
    return typeColors[primary] || typeColors['normal'];
  };
  