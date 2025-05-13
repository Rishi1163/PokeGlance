import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Details from '../pages/Details'
import Favourites from '../pages/Favourites'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/favourite' element={<Favourites />}/>
        <Route />
    </Routes>
  )
}

export default AppRoutes
