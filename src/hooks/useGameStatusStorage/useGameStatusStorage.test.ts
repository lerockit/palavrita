import { vi } from 'vitest'
import { useGameStatusStorage } from '.'
import { Guess } from '../../contexts/global/interface'
import * as database from '../../database'
import * as useDateHook from '../useDate'
import * as useStorageHook from '../useStorage'

const getStorageMock = vi.fn()
const setStorageMock = vi.fn()
const getTodayMock = vi.fn()
const isSameDateMock = vi.fn()
const getDailyWordMock = vi.fn()

describe('useGameStatusStorage', () => {
  afterEach(() => vi.clearAllMocks())
  vi.spyOn(useStorageHook, 'useStorage').mockReturnValue({
    getStorage: getStorageMock,
    setStorage: setStorageMock,
  })
  vi.spyOn(useDateHook, 'useDate').mockReturnValue({
    getToday: getTodayMock,
    isSameDate: isSameDateMock,
  })

  vi.spyOn(database, 'getDailyWordFromDatabase').mockImplementation(
    getDailyWordMock
  )

  it('Should call getStorage and setStorage with correct params when addGuess is called', () => {
    const fakeDefaultGuess: Guess = {
      letters: [{ id: 'A', status: null }],
      word: 'A',
    }

    getStorageMock.mockImplementation(() => ({ guesses: [fakeDefaultGuess] }))
    const fakeGuess: Guess = {
      letters: [{ id: 'B', status: null }],
      word: 'B',
    }

    useGameStatusStorage().addGuess(fakeGuess)

    expect(getStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith({
      guesses: [fakeDefaultGuess, fakeGuess],
    })
  })

  it('Should call getStorage and setStorage with correct params when refreshGame is called', async () => {
    const todayMock = 'TODAY-MOCK'
    const dailyWordMock = 'DAILY-WORD-MOCKs'

    getTodayMock.mockReturnValue(todayMock)
    getDailyWordMock.mockReturnValue(dailyWordMock)

    useGameStatusStorage().refreshGame()

    expect(getStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledTimes(1)
    expect(setStorageMock).toHaveBeenCalledWith({
      guesses: [],
      gameFinishStatus: null,
      lastDate: todayMock,
      dailyWord: dailyWordMock,
    })
  })
})
