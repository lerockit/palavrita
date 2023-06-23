import {
  GameFinishStatus,
  Guess,
  Guesses,
} from '../../contexts/global/interface'

export interface UseGameStatusStorageHook {
  addGuess: (guess: Guess) => void
  finishGame: (gameFinishStatus: GameFinishStatus) => void
  refreshGame: (newDate: string) => void
  getGuesses: () => Guesses
  getLastDate: () => string
}

export interface GameStatusStorage {
  statistics: number[]
  guesses: Guesses
  totalGamesAmount: number
  winPercentage: number
  winStreak: number
  bestStreak: number
  gameFinishStatus: GameFinishStatus
  winAmount: number
  lossAmount: number
  lastDate: string
}
