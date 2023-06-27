import React, { useEffect } from 'react'
import Header from './components/header'
import Router from './components/router'
import { useDate } from './hooks/useDate'
import { useGameStatusStorage } from './hooks/useGameStatusStorage'

const App: React.FC = () => {
  const { isSameDate } = useDate()
  const { getPayload, refreshGame } = useGameStatusStorage()

  useEffect(() => {
    const { lastDate } = getPayload()
    if (!isSameDate(lastDate)) refreshGame()
  }, [])

  return (
    <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-fuchsia-600 relative">
      <div className="w-full h-[4px] bg-slate-50 absolute" />
      <div className="min-h-dvh flex flex-col max-w-md mx-auto">
        <Header />
        <div className="container text-slate-50 flex flex-col justify-between grow items-center">
          <Router />
        </div>
      </div>
    </div>
  )
}

export default App
