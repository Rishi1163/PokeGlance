import { useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { PokemonProvider } from './context/PokemonProvider'
import Header from './components/Header'

function App() {

  return (
    <div>
      <Header />
      <PokemonProvider>
        <Router>
          <AppRoutes />
        </Router>
      </PokemonProvider>
    </div>
  )
}

export default App