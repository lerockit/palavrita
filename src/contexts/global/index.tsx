import React, { ReactNode, createContext } from 'react'

interface GlobalContextInterface {}

const globalContextDefault: GlobalContextInterface = {}

export const GlobalContext =
  createContext<GlobalContextInterface>(globalContextDefault)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
