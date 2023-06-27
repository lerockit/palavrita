import {
  GameFinishStatus,
  Guess,
  Guesses,
} from '../../contexts/global/interface'
import { AllowedWord } from '../../database/interface'

export interface UseGameStatusStorageHook {
  addGuess: (guess: Guess) => void
  finishGame: (gameFinishStatus: GameFinishStatus) => void
  refreshGame: () => void
  getPayload: () => GameStatusStorage
}

export interface GameStatusStorage {
  guessStatistics: number[]
  guesses: Guesses
  totalGamesAmount: number
  winPercentage: number
  winStreak: number
  bestStreak: number
  gameFinishStatus: GameFinishStatus
  winAmount: number
  lossAmount: number
  lastDate: string
  dailyWord: AllowedWord
}
