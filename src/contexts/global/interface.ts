import { AllowedLetterId } from '../../components/keyboard/interfaces'

export interface GlobalContextInterface {
  currentGuess: Guess
  addLetter: (letter: Letter) => void
  removeLetter: () => void
  confirmCurrentGuess: () => void
  previousGuesses: Guesses
  getPreviousLetters: () => Letter[]
  hasError: boolean
  gameFinishStatus: GameFinishStatus
  setGameFinishStatus: (GameFinishStatus: GameFinishStatus) => void
  refreshGame: () => void
}

export interface Guess {
  word: string
  letters: Letter[]
}

export interface Letter {
  status: LetterStatus | null
  id: AllowedLetterId
}

export type LetterStatus = 'CORRECT' | 'DISPLACED' | 'INCORRECT'

export type Guesses = Guess[]

export type GameFinishStatus = 'WON' | 'LOST' | null
