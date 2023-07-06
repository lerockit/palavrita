export interface RouterContextInterface {
  currentRoute: Route
  setCurrentRoute: (route: Route) => void
}

export type Route = 'HOME' | 'STATISTICS' | 'HELP' | 'ABOUT'
