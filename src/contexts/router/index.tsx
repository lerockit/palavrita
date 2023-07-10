import { AnimatePresence } from 'framer-motion'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import PageTemplate from '../../components/page-template'
import useDate from '../../hooks/useDate'
import useGameStatusStorage from '../../hooks/useGameStatusStorage'
import About from '../../pages/about'
import Help from '../../pages/help'
import Home from '../../pages/home'
import Statistics from '../../pages/statistics'
import { GlobalContext } from '../global'
import { Route, RouterContextInterface } from './interface'

export const routerContextDefault: RouterContextInterface = {
  currentRoute: '' as any,
  setCurrentRoute: null as any,
}

export const RouterContext =
  createContext<RouterContextInterface>(routerContextDefault)

const RouterProvider: React.FC = () => {
  const routes: Record<Route, ReactNode> = {
    HOME: <Home />,
    STATISTICS: <Statistics />,
    HELP: <Help />,
    ABOUT: <About />,
  }

  const [currentRoute, setCurrentRouteState] = useState<Route>('' as any)

  const { isSameDate } = useDate()
  const { getPayload } = useGameStatusStorage()
  const { gameFinishStatus, refreshGame } = useContext(GlobalContext)

  const setCurrentRoute = (route: Route) => {
    if (currentRoute === route) return
    setCurrentRouteState(route)
  }

  useEffect(() => {
    const { lastDate } = getPayload()
    if (!isSameDate(lastDate)) {
      refreshGame()
      return setCurrentRoute('HOME')
    }
    if (gameFinishStatus) return setCurrentRoute('STATISTICS')
    setCurrentRoute('HOME')
  }, [])

  useEffect(() => {
    if (gameFinishStatus) return setCurrentRoute('STATISTICS')
    setCurrentRoute('HOME')
  }, [gameFinishStatus])

  return (
    <RouterContext.Provider value={{ currentRoute, setCurrentRoute }}>
      <PageTemplate>
        <AnimatePresence>{routes[currentRoute]}</AnimatePresence>
      </PageTemplate>
    </RouterContext.Provider>
  )
}

export default RouterProvider
