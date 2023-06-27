import React, { ReactNode, useContext, useEffect } from 'react'
import { GlobalContext } from '../../contexts/global'
import { Page } from '../../contexts/global/interface'
import { useGameStatusStorage } from '../../hooks/useGameStatusStorage'
import About from '../../pages/about'
import Help from '../../pages/help'
import Home from '../../pages/home'
import Statistics from '../../pages/statistics'

const routes: Record<Page, ReactNode> = {
  HOME: <Home />,
  STATISTICS: <Statistics />,
  HELP: <Help />,
  ABOUT: <About />,
}

const Router: React.FC = () => {
  const { setCurrentPage } = useContext(GlobalContext)
  const { gameFinishStatus } = useGameStatusStorage().getPayload()

  useEffect(() => {
    if (gameFinishStatus) setCurrentPage('STATISTICS')
  }, [])

  const { currentPage } = useContext(GlobalContext)

  return <>{routes[currentPage]}</>
}

export default Router
