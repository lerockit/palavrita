import useDate from '.'

describe('useDate', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  const year = 2023
  const month = 0
  const day = 1
  const hour = 12
  const minute = 0
  const second = 0
  const date = new Date(year, month, day, hour, minute, second)

  it('Should return today formated when getToday is called', async () => {
    jest.setSystemTime(date)

    const { getToday } = useDate()

    expect(getToday()).toBe(
      `${String(year)}-${String(month + 1).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`
    )
  })

  it('Should return today formated when getTodayInBRFormat is called', async () => {
    jest.setSystemTime(date)

    const { getTodayInBRFormat } = useDate()

    expect(getTodayInBRFormat()).toBe(
      `${String(day).padStart(2, '0')}/${String(month + 1).padStart(
        2,
        '0'
      )}/${String(year)}`
    )
  })

  it('Should compare today with date passed correctly', () => {
    const fakeYear = 2024
    const fakeMonth = 2
    const fakeDay = 2
    const fakeDate = `${String(fakeYear)}-${String(fakeMonth + 1).padStart(
      2,
      '0'
    )}-${String(fakeDay).padStart(2, '0')}`

    const { isSameDate } = useDate()

    expect(isSameDate(fakeDate)).toBeFalsy()

    jest.setSystemTime(new Date(fakeYear, fakeMonth, fakeDay))

    expect(isSameDate(fakeDate)).toBeTruthy()
  })
})
