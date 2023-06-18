import React, { ReactNode, createContext, useState } from 'react'
import { AllowedLetter } from '../../components/keyboard/interfaces'
import { GUESSES_AMOUNT, WORD_SIZE } from '../../constants'
import { useDatabase } from '../../hooks/useDatabase'
import {
  GlobalContextInterface,
  Guess,
  Guesses,
  LetterWithStatus,
} from './interface'

export const globalContextDefault: GlobalContextInterface = {
  currentGuess: { word: '', letters: [] },
  addLetter: null as any,
  removeLetter: null as any,
  confirmCurrentGuess: null as any,
  previousGuesses: [],
  hasError: false,
}

export const GlobalContext =
  createContext<GlobalContextInterface>(globalContextDefault)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { allowedWords, getDailyWord } = useDatabase()

  const [currentGuess, setCurrentGuess] = useState<Guess>({
    word: '',
    letters: [],
  })

  const addLetter = (letter: AllowedLetter) => {
    if (currentGuess.word.length >= WORD_SIZE) return
    const letters = [...currentGuess.letters, letter]
    setCurrentGuess({
      letters,
      word: letters.join(''),
    })
  }

  const removeLetter = () => {
    if (!currentGuess.word.length) return
    const letters = currentGuess.letters.slice(0, -1)
    setCurrentGuess({
      letters,
      word: letters.join(''),
    })
    setHasError(false)
  }

  const cleanCurrentGuess = () => setCurrentGuess({ letters: [], word: '' })

  const getLettersStatus: (letter: AllowedLetter[]) => LetterWithStatus[] = (
    letters
  ) => {
    const dailyWordLetters = getDailyWord().split('')
    const displacedLetters = letters.map<LetterWithStatus>((letter) => {
      return dailyWordLetters.includes(letter)
        ? {
            id: letter,
            status: 'DISPLACED',
          }
        : {
            id: letter,
            status: 'INCORRECT',
          }
    })
    return displacedLetters.map<LetterWithStatus>((letter, index) => {
      return dailyWordLetters[index] === letter.id
        ? {
            ...letter,
            status: 'CORRECT',
          }
        : letter
    })
  }

  const confirmCurrentGuess = () => {
    if (currentGuess.word.length < WORD_SIZE) return
    if (!allowedWords.includes(currentGuess.word)) return setHasError(true)
    // Aqui sera a finalizaçao do jogo
    if (previousGuesses.length >= GUESSES_AMOUNT - 1) return
    addPreviousGuess(currentGuess.letters)
    cleanCurrentGuess()
    setHasError(false)
  }

  const [previousGuesses, setPreviousGuesses] = useState<Guesses>([])

  const addPreviousGuess = (letters: AllowedLetter[]) => {
    const word = letters.join('')
    const lettersWithStatus = getLettersStatus(letters)
    setPreviousGuesses([
      ...previousGuesses,
      { word, letters: lettersWithStatus },
    ])
    console.log(previousGuesses)
  }

  const [hasError, setHasError] = useState<boolean>(false)

  return (
    <GlobalContext.Provider
      value={{
        currentGuess,
        addLetter,
        removeLetter,
        confirmCurrentGuess,
        previousGuesses,
        hasError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
