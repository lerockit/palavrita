import { allowedWords, dailyWord } from '../../database'
import { UseDataBaseHook } from './interface'

export const useDatabase: () => UseDataBaseHook = () => {
  const getDailyWord = () => dailyWord
  return {
    allowedWords,
    getDailyWord,
  }
}
