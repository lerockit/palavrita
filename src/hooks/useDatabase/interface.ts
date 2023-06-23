export interface UseDataBaseHook {
  allowedWords: string[]
  getDailyWord: () => string
}
