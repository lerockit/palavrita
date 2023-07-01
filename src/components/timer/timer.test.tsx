import { render } from '@testing-library/react'
import { vi } from 'vitest'
import Timer from '.'

describe('<Timer />', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('Should hours:minutes:seconds and update after 1 second pass', async () => {
    const year = 2023
    const month = 1
    const day = 1
    const hour = 0
    const minute = 0
    const second = 1
    const date = new Date(year, month, day, hour, minute, second)
    vi.setSystemTime(date)

    const { getByText } = render(<Timer />)

    const hourRemaining = '23'
    const minuteRemaining = '59'
    const secondRemaining = '59'

    expect(
      getByText(`${hourRemaining}:${minuteRemaining}:${secondRemaining}`)
    ).toBeTruthy()

    await vi.advanceTimersByTimeAsync(1000)

    const secondRemainingUpdated = '58'

    expect(
      getByText(`${hourRemaining}:${minuteRemaining}:${secondRemainingUpdated}`)
    ).toBeTruthy()
  })
})
