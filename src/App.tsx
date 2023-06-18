import React, { useContext, useEffect } from 'react'
import Guesses from './components/guesses'
import Header from './components/header'
import Keyboard from './components/keyboard'
import { GlobalContext } from './contexts/global'

const App: React.FC = () => {
  const { hasError } = useContext(GlobalContext)
  useEffect(() => {
    if (hasError) alert('erro')
  }, [hasError])
  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 min-h-screen text-slate-50 flex flex-col justify-between">
      <Header />
      <Guesses />
      <Keyboard />
    </div>
  )
}

export default App
