import React, { ReactNode, useContext } from 'react'
import { GlobalContext } from '../../contexts/global'
import { Page } from '../../contexts/global/interface'
import About from '../../pages/about'
import Help from '../../pages/help'
import Home from '../../pages/home'
import Statistics from '../../pages/statistics'

const ROUTES: Record<Page, ReactNode> = {
  HOME: <Home />,
  STATISTICS: <Statistics />,
  HELP: <Help />,
  ABOUT: <About />,
}

const Router: React.FC = () => {
  const { currentPage } = useContext(GlobalContext)

  return <>{ROUTES[currentPage]}</>
}

export default Router
