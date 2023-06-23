import React, { useEffect } from 'react'
import Guesses from './components/guesses'
import Header from './components/header'
import Keyboard from './components/keyboard'
import { useDate } from './hooks/useDate'
import { useGameStatusStorage } from './hooks/useGameStatusStorage'

const App: React.FC = () => {
  const { getToday, isSameDate } = useDate()
  const { getLastDate, refreshGame } = useGameStatusStorage()

  useEffect(() => {
    const today = getToday()
    const lastDate = getLastDate()

    if (isSameDate(lastDate)) return
    refreshGame(today)
  }, [])

  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 relative">
      <div className="w-full h-[2px] bg-slate-50 absolute" />
      <div className="max-w-md text-slate-50 flex flex-col justify-between h-full mx-auto min-h-screen">
        <Header />
        <Guesses />
        <Keyboard />
      </div>
    </div>
  )
}

export default App
