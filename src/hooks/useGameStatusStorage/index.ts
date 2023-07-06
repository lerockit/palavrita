import { GUESSES_AMOUNT } from '../../constants'
import { GameFinishStatus, Guess } from '../../contexts/global/interface'
import { getDailyWordFromDatabase } from '../../database'
import useDate from '../useDate'
import useStorage from '../useStorage'
import { GameStatusStorage, UseGameStatusStorageHook } from './interface'

const useGameStatusStorage: () => UseGameStatusStorageHook = () => {
  const { getToday } = useDate()
  const today = getToday()

  const { getStorage, setStorage } = useStorage<GameStatusStorage>(
    'palavrita-game-status'
  )

  if (!getStorage()) {
    const defaultGuessStatistics: number[] = Array(GUESSES_AMOUNT).fill(0)
    const defaultGameStatusStorage: GameStatusStorage = {
      bestStreak: 0,
      guesses: [],
      guessStatistics: defaultGuessStatistics,
      totalGamesAmount: 0,
      winPercentage: 0,
      winStreak: 0,
      gameFinishStatus: null,
      winAmount: 0,
      lossAmount: 0,
      lastDate: today,
      dailyWord: getDailyWordFromDatabase(today),
    }
    setStorage(defaultGameStatusStorage)
  }

  const addGuess = (guess: Guess) => {
    const storage = getStorage() as GameStatusStorage
    setStorage({ ...storage, guesses: [...storage.guesses, guess] })
  }

  const finishGame = (gameFinishStatus: GameFinishStatus) => {
    const hasWon = gameFinishStatus === 'WON'
    const {
      totalGamesAmount,
      guessStatistics,
      winStreak,
      bestStreak,
      guesses,
      winAmount,
      lossAmount,
      lastDate,
      dailyWord,
    } = getStorage() as GameStatusStorage

    const guessAmountIndex = guesses.length - 1

    const newTotalGameAmount = totalGamesAmount + 1
    const newWinStreak = hasWon ? winStreak + 1 : 0
    const newBestStreak = newWinStreak > bestStreak ? newWinStreak : bestStreak
    const newWinAmount = hasWon ? winAmount + 1 : winAmount
    const newLossAmount = hasWon ? lossAmount : lossAmount + 1
    const newWinPercentage =
      +(newWinAmount / newTotalGameAmount).toFixed(2) * 100
    const newGuessStatistics = hasWon
      ? guessStatistics.map((statistic, index) =>
          index === guessAmountIndex ? statistic + 1 : statistic
        )
      : guessStatistics

    setStorage({
      totalGamesAmount: newTotalGameAmount,
      winPercentage: newWinPercentage,
      bestStreak: newBestStreak,
      guessStatistics: newGuessStatistics,
      winStreak: newWinStreak,
      winAmount: newWinAmount,
      lossAmount: newLossAmount,
      gameFinishStatus,
      guesses,
      lastDate,
      dailyWord,
    })
  }

  const refreshGame = () => {
    const storage = getStorage() as GameStatusStorage
    setStorage({
      ...storage,
      guesses: [],
      gameFinishStatus: null,
      lastDate: today,
      dailyWord: getDailyWordFromDatabase(today),
    })
  }

  return {
    addGuess,
    finishGame,
    refreshGame,
    getPayload: getStorage as () => GameStatusStorage,
  }
}

export default useGameStatusStorage
