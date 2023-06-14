import React, { useContext } from 'react'
import Header from './components/header'
import Keyboard from './components/keyboard'
import { GlobalContext } from './contexts/global'

const App: React.FC = () => {
  const { actualGuess } = useContext(GlobalContext)
  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 min-h-screen text-slate-50">
      <Header />
      <Keyboard />
      {actualGuess.word}
    </div>
  )
}

export default App
