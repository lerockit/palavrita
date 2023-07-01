import { vi } from 'vitest'
import { useStorage } from '.'
import { AllowedStorageKeys } from './interface'

describe('useStorage', () => {
  const keyMock = 'KEY-MOCK' as AllowedStorageKeys
  const defaultPayloadMock = {}
  const getStorageItemMock = vi.fn()
  const setStorageItemMock = vi.fn()
  window.localStorage = {
    ...window.localStorage,
    getItem: getStorageItemMock,
    setItem: setStorageItemMock,
  }

  afterEach(() => vi.clearAllMocks())

  it('Should call setItem form storage with default values if getItem returns null', () => {
    getStorageItemMock.mockReturnValue(null)
    useStorage(keyMock, defaultPayloadMock)
    expect(setStorageItemMock).toHaveBeenCalledTimes(1)
    expect(setStorageItemMock).toHaveBeenCalledWith(
      keyMock,
      JSON.stringify(defaultPayloadMock)
    )
  })

  it('Should parse getItem returned value', () => {
    const getStorageItemReturn = '{"mock": "true"}'
    getStorageItemMock.mockReturnValue(getStorageItemReturn)
    const { getStorage } = useStorage(keyMock, defaultPayloadMock)
    expect(getStorage()).toStrictEqual(JSON.parse(getStorageItemReturn))
  })

  it('Should stringify setItem payload', () => {
    const setItemPayload = { mock: 'true' }
    const { setStorage } = useStorage(keyMock, defaultPayloadMock)
    setStorage(setItemPayload)
    expect(setStorageItemMock).toHaveBeenCalledTimes(1)
    expect(setStorageItemMock).toHaveBeenCalledWith(
      keyMock,
      JSON.stringify(setItemPayload)
    )
  })
})
