import { allowedWords, dailyWord } from '../../database'

export const useDatabase: () => UseDatabase = () => {
  const getDailyWord = () => dailyWord
  return {
    allowedWords,
    getDailyWord,
  }
}
