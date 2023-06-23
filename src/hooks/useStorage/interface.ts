export interface UseStorageHook<T> {
  getStorage: () => T
  setStorage: (payload: T) => void
}

export type AllowedStorageKeys = 'palavrita-game-status'
