import Footer from '.'
import { renderWithRouterContext } from '../../test/utils'

describe('<Footer />', () => {
  it('Should call setCurrentPage with correct params when click on home button', () => {
    const setCurrentRoute = jest.fn()
    const { getByRole } = renderWithRouterContext(<Footer />, {
      setCurrentRoute,
    })
    const buttonElement = getByRole('button')
    buttonElement.click()
    expect(setCurrentRoute).toHaveBeenCalledTimes(1)
    expect(setCurrentRoute).toHaveBeenCalledWith('HOME')
  })
})
