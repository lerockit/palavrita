import Header from '.'
import { renderWithRouterContext } from '../../test/utils'

describe('<Header />', () => {
  const setCurrentRoute = jest.fn()

  afterEach(() => jest.clearAllMocks())

  it('Should call setCurrentRoute with correct params when click on help button', () => {
    const { getByTestId } = renderWithRouterContext(<Header />, {
      setCurrentRoute,
    })

    const helpPageButton = getByTestId('help-page-button')
    helpPageButton.click()
    expect(setCurrentRoute).toHaveBeenCalledTimes(1)
    expect(setCurrentRoute).toHaveBeenCalledWith('HELP')
  })

  it('Should call setCurrentRoute with correct params when click on logo', () => {
    const { getByTestId } = renderWithRouterContext(<Header />, {
      setCurrentRoute,
    })

    const logo = getByTestId('logo')
    logo.click()
    expect(setCurrentRoute).toHaveBeenCalledTimes(1)
    expect(setCurrentRoute).toHaveBeenCalledWith('HOME')
  })

  it('Should call setCurrentRoute with correct params when click on statistics button', () => {
    const { getByTestId } = renderWithRouterContext(<Header />, {
      setCurrentRoute,
    })

    const statisticsPageButton = getByTestId('statistics-page-button')
    statisticsPageButton.click()
    expect(setCurrentRoute).toHaveBeenCalledTimes(1)
    expect(setCurrentRoute).toHaveBeenCalledWith('STATISTICS')
  })

  it('Should call setCurrentRoute with correct params when click on about button', () => {
    const { getByTestId } = renderWithRouterContext(<Header />, {
      setCurrentRoute,
    })

    const aboutPageButton = getByTestId('about-page-button')
    aboutPageButton.click()
    expect(setCurrentRoute).toHaveBeenCalledTimes(1)
    expect(setCurrentRoute).toHaveBeenCalledWith('ABOUT')
  })
})
