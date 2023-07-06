export interface UseStorageHook<T> {
  getStorage: () => T | null
  setStorage: (payload: T) => void
}

export type AllowedStorageKeys = 'palavrita-game-status'
