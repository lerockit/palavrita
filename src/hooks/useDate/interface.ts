export interface UseDateHook {
  getToday: () => string
  isSameDate: (dayToCompare: string) => boolean
}
