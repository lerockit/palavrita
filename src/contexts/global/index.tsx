import React, { ReactNode, createContext, useState } from 'react'
import { AllowedLetters } from '../../components/keyboard/interfaces'
import { GlobalContextInterface, Guess, Guesses } from './interface'

const globalContextDefault: GlobalContextInterface = {
  actualGuess: { word: '', letters: [] },
  setActualGuess: () => {},
  allGuesses: [],
  setAllGuesses: () => [],
}

export const GlobalContext =
  createContext<GlobalContextInterface>(globalContextDefault)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actualGuess, setActualGuessState] = useState<Guess>({
    word: '',
    letters: [],
  })

  const [allGuesses, setAllGuesses] = useState<Guesses>([])

  const setActualGuess = (letters: AllowedLetters[]) => {
    setActualGuessState({
      letters,
      word: letters.join(''),
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        actualGuess,
        setActualGuess,
        allGuesses,
        setAllGuesses,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
