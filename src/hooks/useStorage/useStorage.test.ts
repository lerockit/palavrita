import useStorage from '.'
import { mockLocalStorage } from '../../test/utils'
import { AllowedStorageKeys } from './interface'

describe('useStorage', () => {
  const keyMock = 'KEY-MOCK' as AllowedStorageKeys
  const { getItemMock, setItemMock } = mockLocalStorage()

  afterEach(() => jest.clearAllMocks())

  it('Should parse getItem returned value', () => {
    const getItemMockReturn = '{"mock": "true"}'
    getItemMock.mockReturnValue(getItemMockReturn)
    const { getStorage } = useStorage(keyMock)
    expect(getStorage()).toStrictEqual(JSON.parse(getItemMockReturn))
  })

  it('Should stringify setItem payload', () => {
    getItemMock.mockReturnValue('{"mock": "true"}')
    const setItemPayload = { mock: 'true' }
    const { setStorage } = useStorage(keyMock)
    setStorage(setItemPayload)
    expect(setItemMock).toHaveBeenCalledTimes(1)
    expect(setItemMock).toHaveBeenCalledWith(
      keyMock,
      JSON.stringify(setItemPayload)
    )
  })
})
