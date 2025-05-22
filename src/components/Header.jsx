import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 flex justify-between items-center px-5 bg-white/30 backdrop-blur-xl shadow-md">
      <Link to={'/'}><img src={logo} alt="PokeGlance Logo" className="w-60 h-full object-cover" /></Link>
      <Link to={'/favourite'} className='md:px-3 font-pokemon lg:border-none lg:bg-white lg:text-black hover:border-none text-sm px-3 ml-4 md:ml-0 py-1 pb-2 rounded-xl tracking-wider lg:hover:bg-red-600 md:text-base lg:hover:text-white bg-red-500 text-white  transition-all duration-300'>PokeVault</Link>
    </header>
  )
}

export default Header
