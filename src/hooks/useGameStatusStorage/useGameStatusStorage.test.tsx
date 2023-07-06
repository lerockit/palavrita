import useGameStatusStorage from '.'
import { Guess } from '../../contexts/global/interface'
import { getDailyWordFromDatabase } from '../../database'

const getTodayMock = jest.fn()
const isSameDateMock = jest.fn()
const getStorageMock = jest.fn()
const setStorageMock = jest.fn()

jest.mock('../useDate', () => {
  return () => ({
    getToday: getTodayMock,
    isSameDate: isSameDateMock,
  })
})

jest.mock('../useStorage', () => {
  return () => ({
    getStorage: getStorageMock,
    setStorage: setStorageMock,
  })
})

jest.mock('../../database', () => ({
  getDailyWordFromDatabase: jest.fn(),
}))

const fakeDailyWord = 'FAKE-DAILY-WORD'
const fakeDate = 'FAKE-DATE'

const fakeStorageReturn = {
  bestStreak: 0,
  guesses: [],
  guessStatistics: [0, 0, 0, 0, 0, 0],
  totalGamesAmount: 0,
  winPercentage: 0,
  winStreak: 0,
  gameFinishStatus: null,
  winAmount: 0,
  lossAmount: 0,
  lastDate: fakeDate,
  dailyWord: fakeDailyWord,
}

describe('useGameStatusStorage', () => {
  afterEach(() => jest.restoreAllMocks())

  it('Should call getStorage and not call setStorage if getStorage not returns null when initialize', () => {
    getStorageMock.mockReturnValue(fakeStorageReturn)
    useGameStatusStorage()
    expect(getStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledTimes(0)
  })

  it('Should call setStorage and getDailyWordFromDatabase with correct params if getStorage returns null when initialize', () => {
    ;(getDailyWordFromDatabase as jest.Mock).mockReturnValue(fakeDailyWord)
    getStorageMock.mockReturnValue(null)
    getTodayMock.mockReturnValue(fakeDate)
    useGameStatusStorage()
    expect(getStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(getDailyWordFromDatabase).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith({
      ...fakeStorageReturn,
      dailyWord: fakeDailyWord,
    })
  })

  it('Should call getStorage and setStorage with correct params when addGuess is called', () => {
    getStorageMock.mockReturnValue(fakeStorageReturn)
    const fakeNewGuess: Guess = {
      letters: [{ id: 'B', status: null }],
      word: 'B',
    }

    const { addGuess } = useGameStatusStorage()

    addGuess(fakeNewGuess)

    expect(getStorageMock).toHaveBeenCalledTimes(2)
    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith({
      ...fakeStorageReturn,
      guesses: [fakeNewGuess],
    })
  })

  it('Should call getStorage and setStorage with correct params when refreshGame is called', async () => {
    ;(getDailyWordFromDatabase as jest.Mock).mockReturnValue(fakeDailyWord)
    getTodayMock.mockReturnValue(fakeDate)
    getStorageMock.mockReturnValue(fakeStorageReturn)

    const { refreshGame } = useGameStatusStorage()
    refreshGame()

    expect(getStorageMock).toHaveBeenCalledTimes(2)
    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith({
      ...fakeStorageReturn,
      lastDate: fakeDate,
      dailyWord: fakeDailyWord,
    })
  })

  it('Should call getDailyWordFromDatabase and setStorage with correct params when finishGame with WON is called', () => {
    ;(getDailyWordFromDatabase as jest.Mock).mockReturnValue(fakeDailyWord)
    getTodayMock.mockReturnValue(fakeDate)
    getStorageMock.mockReturnValue({ ...fakeStorageReturn, guesses: ['fake'] })

    const gameFinishStatus = 'WON'
    const { finishGame } = useGameStatusStorage()
    finishGame(gameFinishStatus)

    const newStorageMock = {
      totalGamesAmount: 1,
      winPercentage: 100,
      bestStreak: 1,
      guessStatistics: [1, 0, 0, 0, 0, 0],
      winStreak: 1,
      winAmount: 1,
      lossAmount: 0,
      gameFinishStatus,
      guesses: ['fake'],
      lastDate: fakeDate,
      dailyWord: fakeDailyWord,
    }

    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith(newStorageMock)
  })

  it('Should call getDailyWordFromDatabase and setStorage with correct params when finishGame with LOST is called', () => {
    ;(getDailyWordFromDatabase as jest.Mock).mockReturnValue(fakeDailyWord)
    getTodayMock.mockReturnValue(fakeDate)
    getStorageMock.mockReturnValue({ ...fakeStorageReturn })

    const gameFinishStatus = 'LOST'
    const { finishGame } = useGameStatusStorage()
    finishGame(gameFinishStatus)

    const newStorageMock = {
      totalGamesAmount: 1,
      winPercentage: 0,
      bestStreak: 0,
      guessStatistics: [0, 0, 0, 0, 0, 0],
      winStreak: 0,
      winAmount: 0,
      lossAmount: 1,
      gameFinishStatus,
      guesses: [],
      lastDate: fakeDate,
      dailyWord: fakeDailyWord,
    }

    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith(newStorageMock)
  })
})
