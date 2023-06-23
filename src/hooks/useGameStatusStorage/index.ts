import { GUESSES_AMOUNT } from '../../constants'
import { GameFinishStatus, Guess } from '../../contexts/global/interface'
import { useStorage } from '../useStorage'
import { GameStatusStorage, UseGameStatusStorageHook } from './interface'

export const useGameStatusStorage: () => UseGameStatusStorageHook = () => {
  const defaultStatistics: number[] = Array(GUESSES_AMOUNT).fill(0)

  const defaultGameStatusStorage: GameStatusStorage = {
    bestStreak: 0,
    guesses: [],
    statistics: defaultStatistics,
    totalGamesAmount: 0,
    winPercentage: 0,
    winStreak: 0,
    gameFinishStatus: null,
    winAmount: 0,
    lossAmount: 0,
    lastDate: '',
  }

  const { getStorage, setStorage } = useStorage<GameStatusStorage>(
    'palavrita-game-status',
    defaultGameStatusStorage
  )

  const addGuess = (guess: Guess) => {
    const storage = getStorage()
    setStorage({ ...storage, guesses: [...storage.guesses, guess] })
  }

  const finishGame = (gameFinishStatus: GameFinishStatus) => {
    const hasWon = gameFinishStatus === 'WON'

    const {
      totalGamesAmount,
      statistics,
      winStreak,
      bestStreak,
      guesses,
      winAmount,
      lossAmount,
      lastDate,
    } = getStorage()

    const guessAmountIndex = guesses.length - 1

    const newTotalGameAmount = totalGamesAmount + 1
    const newWinStreak = hasWon ? winStreak + 1 : 0
    const newBestStreak = newWinStreak > bestStreak ? newWinStreak : bestStreak
    const newWinAmount = hasWon ? winAmount + 1 : winAmount
    const newLossAmount = hasWon ? lossAmount : lossAmount + 1
    const newWinPercentage =
      +(newWinAmount / newTotalGameAmount).toFixed(2) * 100
    const newStatistics = hasWon
      ? statistics.map((statistic, index) =>
          index === guessAmountIndex ? statistic + 1 : statistic
        )
      : statistics

    setStorage({
      totalGamesAmount: newTotalGameAmount,
      winPercentage: newWinPercentage,
      bestStreak: newBestStreak,
      statistics: newStatistics,
      winStreak: newWinStreak,
      winAmount: newWinAmount,
      lossAmount: newLossAmount,
      gameFinishStatus,
      guesses,
      lastDate,
    })
  }

  const refreshGame = (newDate: string) => {
    const storage = getStorage()
    setStorage({
      ...storage,
      guesses: [],
      gameFinishStatus: null,
      lastDate: newDate,
    })
  }

  const getGuesses = () => getStorage().guesses

  const getLastDate = () => getStorage().lastDate

  return {
    addGuess,
    finishGame,
    refreshGame,
    getGuesses,
    getLastDate,
  }
}
