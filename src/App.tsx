import React from 'react'
import Header from './components/header'
import Keyboard from './components/keyboard'

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 min-h-screen text-slate-50">
      <Header />
      <Keyboard />
    </div>
  )
}

export default App
