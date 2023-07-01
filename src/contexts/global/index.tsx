import React, { ReactNode, createContext, useState } from 'react'
import { GUESSES_AMOUNT, WORD_SIZE } from '../../constants'
import { allowedWords } from '../../database'
import { useGameStatusStorage } from '../../hooks/useGameStatusStorage'
import {
  GameFinishStatus,
  GlobalContextInterface,
  Guess,
  Guesses,
  Letter,
  Page,
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
  currentPage: 'HOME',
  setCurrentPage: null as any,
}

export const GlobalContext =
  createContext<GlobalContextInterface>(globalContextDefault)

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const gameStatusStorage = useGameStatusStorage()
  const gameStatusStoragePayload = useGameStatusStorage().getPayload()
  const dailyWordLetters = gameStatusStoragePayload.dailyWord.split('')

  const [currentGuess, setCurrentGuessState] = useState<Guess>({
    word: '',
    letters: [],
  })

  const [previousGuesses, setPreviousGuesses] = useState<Guesses>(
    gameStatusStoragePayload.guesses
  )

  const [hasError, setHasError] = useState<boolean>(false)
  const [gameFinishStatus, setGameFinishStatus] = useState<GameFinishStatus>(
    gameStatusStoragePayload.gameFinishStatus
  )

  const [currentPage, setCurrentPage] = useState<Page>('HOME')

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
    const dailyWordLettersToCompare = [...dailyWordLetters]

    const correctLetters = letters.map<Letter>((letter, index) => {
      if (dailyWordLettersToCompare[index] === letter.id) {
        delete dailyWordLettersToCompare[index]
        return { ...letter, status: 'CORRECT' }
      }

      return letter
    })

    const lettersWithStatus = correctLetters.map<Letter>((letter) => {
      if (letter.status === 'CORRECT') return letter
      if (dailyWordLettersToCompare.includes(letter.id)) {
        const indexToRemove = dailyWordLettersToCompare.indexOf(letter.id)
        delete dailyWordLettersToCompare[indexToRemove]
        return {
          ...letter,
          status: 'DISPLACED',
        }
      }

      return {
        ...letter,
        status: 'INCORRECT',
      }
    })

    return lettersWithStatus
  }

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
    setCurrentPage('STATISTICS')
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
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
