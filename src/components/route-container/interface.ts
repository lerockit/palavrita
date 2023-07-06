import { ReactNode } from 'react'
import { Route } from '../../contexts/router/interface'

export interface RouteContainerProps {
  children: ReactNode
  routeKey: Route
}
