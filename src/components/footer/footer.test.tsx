import { vi } from 'vitest'
import Footer from '.'
import { renderWithGlobalContext } from '../../test/setup'

describe('<Footer />', () => {
  it('Should call setCurrentPage with correct params when click on home button', () => {
    const setCurrentPage = vi.fn()
    const { getByRole } = renderWithGlobalContext(<Footer />, {
      setCurrentPage,
    })
    const buttonElement = getByRole('button')
    buttonElement.click()
    expect(setCurrentPage).toHaveBeenCalledTimes(1)
    expect(setCurrentPage).toHaveBeenCalledWith('HOME')
  })
})
