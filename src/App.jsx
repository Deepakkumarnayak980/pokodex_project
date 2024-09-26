import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/Pokedex/Pokedex'
import Pokedex from './components/Pokedex/Pokedex'

function App() {
  const [count, setCount] = useState(0)

  return (
   
    <h1>
      <Pokedex/>
    </h1>
  )
}

export default App
