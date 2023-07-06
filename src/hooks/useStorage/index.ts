import { AllowedStorageKeys, UseStorageHook } from './interface'

const useStorage = <T>(key: AllowedStorageKeys): UseStorageHook<T> => {
  const { localStorage } = window

  const getStorage = (): T | null => {
    const payloadJSON = localStorage.getItem(key)
    return JSON.parse(payloadJSON as string)
  }

  const setStorage = (payload: T) => {
    const payloadJSON = JSON.stringify(payload)
    localStorage.setItem(key, payloadJSON)
  }

  return {
    getStorage,
    setStorage,
  }
}

export default useStorage
