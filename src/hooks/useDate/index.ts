import { UseDateHook } from './interface'

const MILISSECONDS_IN_A_MINUTE = 60 * 1000

const useDate: () => UseDateHook = () => {
  const getToday = (): string => {
    const todayDate = new Date()
    const correctedDate = new Date(
      todayDate.valueOf() -
        todayDate.getTimezoneOffset() * MILISSECONDS_IN_A_MINUTE
    )

    const [today] = correctedDate.toISOString().split('T')

    return today
  }

  const isSameDate = (dateToCompare: string): boolean => {
    return dateToCompare === getToday()
  }

  const getTodayInBRFormat = (): string => {
    const today = getToday()
    return today.split('-').reverse().join('/')
  }

  return {
    getToday,
    isSameDate,
    getTodayInBRFormat,
  }
}

export default useDate
