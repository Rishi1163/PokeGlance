import React from 'react'
import logo from '../assets/img/logo.png'

const Header = () => {
    return (
      <div className='px-20'>
          <header className="fixed top-0 left-0 right-0 z-50 h-24 flex justify-center items-center px-5 bg-white/30 backdrop-blur-xl shadow-md">
            <img src={logo} alt="PokeGlance Logo" className="w-60 h-full object-cover" />
        </header>
      </div>
    )
}

export default Header
