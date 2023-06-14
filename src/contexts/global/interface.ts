import { AllowedLetters } from '../../components/keyboard/interfaces'

export interface GlobalContextInterface {
  actualGuess: Guess
  setActualGuess: (letters: AllowedLetters[]) => void
  allGuesses: Guesses
  setAllGuesses: (allGuesses: Guesses) => void
}

export interface Guess {
  word: string
  letters: AllowedLetters[]
}

export type Guesses = Guess[]
