import { vi } from 'vitest'
import Header from '.'
import { renderWithGlobalContext } from '../../test/setup'

describe('<Header />', () => {
  const setCurrentPage = vi.fn()

  afterEach(() => vi.clearAllMocks())

  it('Should call setCurrentPage with correct params when click on help button', () => {
    const { getByTestId } = renderWithGlobalContext(<Header />, {
      setCurrentPage,
    })

    const helpPageButton = getByTestId('help-page-button')
    helpPageButton.click()
    expect(setCurrentPage).toHaveBeenCalledTimes(1)
    expect(setCurrentPage).toHaveBeenCalledWith('HELP')
  })

  it('Should call setCurrentPage with correct params when click on logo', () => {
    const { getByTestId } = renderWithGlobalContext(<Header />, {
      setCurrentPage,
    })

    const logo = getByTestId('logo')
    logo.click()
    expect(setCurrentPage).toHaveBeenCalledTimes(1)
    expect(setCurrentPage).toHaveBeenCalledWith('HOME')
  })

  it('Should call setCurrentPage with correct params when click on statistics button', () => {
    const { getByTestId } = renderWithGlobalContext(<Header />, {
      setCurrentPage,
    })

    const statisticsPageButton = getByTestId('statistics-page-button')
    statisticsPageButton.click()
    expect(setCurrentPage).toHaveBeenCalledTimes(1)
    expect(setCurrentPage).toHaveBeenCalledWith('STATISTICS')
  })

  it('Should call setCurrentPage with correct params when click on about button', () => {
    const { getByTestId } = renderWithGlobalContext(<Header />, {
      setCurrentPage,
    })

    const aboutPageButton = getByTestId('about-page-button')
    aboutPageButton.click()
    expect(setCurrentPage).toHaveBeenCalledTimes(1)
    expect(setCurrentPage).toHaveBeenCalledWith('ABOUT')
  })
})
