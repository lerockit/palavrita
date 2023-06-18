import { AllowedLetter } from '../../components/keyboard/interfaces'

export interface GlobalContextInterface {
  currentGuess: Guess
  addLetter: (letter: AllowedLetter) => void
  removeLetter: () => void
  confirmCurrentGuess: () => void
  previousGuesses: Guesses
  hasError: boolean
}

export interface Guess {
  word: string
  letters: AllowedLetter[]
}

export interface GuessWithStatus {
  word: string
  letters: LetterWithStatus[]
}

export interface LetterWithStatus {
  status: LetterStatus
  id: AllowedLetter
}

export type LetterStatus = 'CORRECT' | 'DISPLACED' | 'INCORRECT'

export type Guesses = GuessWithStatus[]
