import React, { ReactNode, createContext, useState } from 'react'
import { GUESSES_AMOUNT, WORD_SIZE } from '../../constants'
import { useDatabase } from '../../hooks/useDatabase'
import { useGameStatusStorage } from '../../hooks/useGameStatusStorage'
import {
  GameFinishStatus,
  GlobalContextInterface,
  Guess,
  Guesses,
  Letter,
} from './interface'

export const globalContextDefault: GlobalContextInterface = {
  currentGuess: { word: '', letters: [] },
  addLetter: null as any,
  removeLetter: null as any,
  confirmCurrentGuess: null as any,
  previousGuesses: [],
  getPreviousLetters: null as any,
  hasError: false,
  gameFinishStatus: null,
  setGameFinishStatus: null as any,
  refreshGame: null as any,
}

export const GlobalContext =
  createContext<GlobalContextInterface>(globalContextDefault)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { allowedWords, getDailyWord } = useDatabase()
  const gameStatusStorage = useGameStatusStorage()
  const dailyWordLetters = getDailyWord().split('')

  const [currentGuess, setCurrentGuessState] = useState<Guess>({
    word: '',
    letters: [],
  })

  const getWordByLetters = (letters: Letter[]) =>
    letters.reduce(
      (previousLetter, currentLetter) => `${previousLetter}${currentLetter.id}`,
      ''
    )

  const setCurrentGuess = (letters: Letter[]) => {
    const word = getWordByLetters(letters)
    setCurrentGuessState({
      letters,
      word,
    })
  }

  const addLetter = (letter: Letter) => {
    if (currentGuess.word.length >= WORD_SIZE || !!gameFinishStatus) return
    setCurrentGuess([...currentGuess.letters, letter])
  }

  const removeLetter = () => {
    if (!currentGuess.word.length) return
    setCurrentGuess(currentGuess.letters.slice(0, -1))
    setHasError(false)
  }

  const cleanCurrentGuess = () => setCurrentGuess([])

  const setLettersStatus: (letter: Letter[]) => Letter[] = (letters) => {
    const displacedLetters = letters.map<Letter>((letter) => {
      return dailyWordLetters.includes(letter.id)
        ? {
            id: letter.id,
            status: 'DISPLACED',
          }
        : {
            id: letter.id,
            status: 'INCORRECT',
          }
    })
    return displacedLetters.map<Letter>((letter, index) => {
      return dailyWordLetters[index] === letter.id
        ? {
            ...letter,
            status: 'CORRECT',
          }
        : letter
    })
  }

  const [previousGuesses, setPreviousGuesses] = useState<Guesses>(
    gameStatusStorage.getGuesses()
  )

  const addPreviousGuess = (letters: Letter[]) => {
    const word = getWordByLetters(letters)
    const lettersWithStatus = setLettersStatus(letters)
    const newGuess = { word, letters: lettersWithStatus }
    gameStatusStorage.addGuess(newGuess)
    setPreviousGuesses([...previousGuesses, newGuess])
  }

  const getPreviousLetters = () => {
    return previousGuesses
      .map<Letter[]>((previousGuess) => previousGuess.letters)
      .flat()
  }

  const [hasError, setHasError] = useState<boolean>(false)
  const [gameFinishStatus, setGameFinishStatus] =
    useState<GameFinishStatus>(null)

  const allLettersMatch = (): boolean => {
    return (
      currentGuess.letters.filter((letter, index) => {
        return dailyWordLetters[index] === letter.id
      }).length === WORD_SIZE
    )
  }

  const hasGuessesLeft = (): boolean => {
    return previousGuesses.length < GUESSES_AMOUNT - 1
  }

  const finishGame = (gameFinishStatus: GameFinishStatus) => {
    setGameFinishStatus(gameFinishStatus)
    gameStatusStorage.finishGame(gameFinishStatus)
  }

  const confirmCurrentGuess = () => {
    if (currentGuess.word.length < WORD_SIZE) return
    if (!allowedWords.includes(currentGuess.word)) return setHasError(true)

    addPreviousGuess(currentGuess.letters)
    cleanCurrentGuess()
    setHasError(false)

    if (allLettersMatch()) return finishGame('WON')
    if (!hasGuessesLeft()) return finishGame('LOST')
  }

  const refreshGame = () => {}

  return (
    <GlobalContext.Provider
      value={{
        currentGuess,
        addLetter,
        removeLetter,
        confirmCurrentGuess,
        previousGuesses,
        getPreviousLetters,
        hasError,
        gameFinishStatus,
        setGameFinishStatus,
        refreshGame,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
