import { AllowedStorageKeys, UseStorageHook } from './interface'

export const useStorage = <T>(
  key: AllowedStorageKeys,
  defaultPayload: T
): UseStorageHook<T> => {
  const { localStorage } = window

  const getStorage = (): T => {
    const payloadJSON = localStorage.getItem(key)
    return JSON.parse(payloadJSON as string)
  }

  const setStorage = (payload: T) => {
    const payloadJSON = JSON.stringify(payload)
    localStorage.setItem(key, payloadJSON)
  }

  if (!getStorage()) setStorage(defaultPayload)

  return {
    getStorage,
    setStorage,
  }
}
