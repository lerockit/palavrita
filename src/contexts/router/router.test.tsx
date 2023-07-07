import { render } from '@testing-library/react'
import { useContext } from 'react'
import { act } from 'react-dom/test-utils'
import RouterProvider, { RouterContext } from '.'
import Help from '../../pages/help'
import Home from '../../pages/home'
import Statistics from '../../pages/statistics'
import { waitForAnimation } from '../../test/utils'

const getTodayMock = jest.fn()
const isSameDateMock = jest.fn()
const addGuessMock = jest.fn()
const finishGameMock = jest.fn()
const refreshGameMock = jest.fn()
const getPayloadMock = jest.fn()

jest.mock('../../pages/home')
jest.mock('../../pages/help')
jest.mock('../../pages/statistics')

jest.mock('../../hooks/useDate', () => {
  return () => ({
    getToday: getTodayMock,
    isSameDate: isSameDateMock,
  })
})

jest.mock('../../hooks/useGameStatusStorage', () => {
  return () => ({
    addGuess: addGuessMock,
    finishGame: finishGameMock,
    refreshGame: refreshGameMock,
    getPayload: getPayloadMock,
  })
})

const fakeDate = 'FAKE-DATE'

const fakeGetPayload = {
  lastDate: fakeDate,
  gameFinishStatus: null,
}

describe('<RouterProvider />', () => {
  afterEach(() => jest.clearAllMocks())
  it('Should behave correctly when setCurrentRoute is called with same currentRoute', async () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    isSameDateMock.mockReturnValue(true)

    const HomeTestComponent = () => {
      const { setCurrentRoute, currentRoute } = useContext(RouterContext)
      return (
        <>
          <button
            data-testid="mock-button-home"
            onClick={() => setCurrentRoute('HOME')}
          ></button>
          {currentRoute}
        </>
      )
    }

    ;(Home as jest.Mock).mockReturnValue(<HomeTestComponent />)

    const { getByTestId, getByText } = render(<RouterProvider />)

    await waitForAnimation(() => {
      getByTestId('mock-button-home').click()
    }, 500)

    expect(getByText('HOME')).toBeInTheDocument()
  })

  it('Should behave correctly when setCurrentRoute is called with different currentRoute', async () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    isSameDateMock.mockReturnValue(true)

    const HomeTestComponent = () => {
      const { setCurrentRoute } = useContext(RouterContext)
      return (
        <button
          data-testid="mock-button-help"
          onClick={() => setCurrentRoute('HELP')}
        ></button>
      )
    }

    const HelpTestComponent = () => <>HELP</>
    ;(Home as jest.Mock).mockReturnValue(<HomeTestComponent />)
    ;(Help as jest.Mock).mockReturnValue(<HelpTestComponent />)

    const { getByTestId, getByText } = render(<RouterProvider />)

    await waitForAnimation(() => {
      getByTestId('mock-button-help').click()
    }, 500)

    expect(getByText('HELP')).toBeInTheDocument()
  })

  it('Should call refreshGame if isSameDate is false', () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    isSameDateMock.mockReturnValue(false)

    render(<RouterProvider />)

    act(() => expect(refreshGameMock).toHaveBeenCalledTimes(1))
  })

  it('Should call <Statistics /> if gameFinishStatus is not null', () => {
    getPayloadMock.mockReturnValue({
      ...fakeGetPayload,
      gameFinishStatus: 'WON',
    })
    isSameDateMock.mockReturnValue(true)

    const StatisticsTestComponent = () => <>STATISTICS</>
    ;(Statistics as jest.Mock).mockReturnValue(<StatisticsTestComponent />)

    const { getByText } = render(<RouterProvider />)

    expect(getByText('STATISTICS')).toBeInTheDocument()
  })

  it('Should call <Home/> if gameFinishStatus null', async () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    isSameDateMock.mockReturnValue(true)

    const HomeTestComponent = () => <>HOME</>
    const StatisticsTestComponent = () => <>STATISTICS</>
    ;(Home as jest.Mock).mockReturnValue(<HomeTestComponent />)
    ;(Statistics as jest.Mock).mockReturnValue(<StatisticsTestComponent />)

    const { getByText } = render(<RouterProvider />)

    expect(getByText('HOME')).toBeInTheDocument()
  })
})
