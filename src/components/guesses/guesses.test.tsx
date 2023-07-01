import { render } from '@testing-library/react'
import Guesses from '.'
import { GUESSES_AMOUNT } from '../../constants'

describe('<Guesses />', () => {
  it('Should render GUESSES_AMOUNT length of guess container', () => {
    const { getAllByTestId } = render(<Guesses />)

    expect(getAllByTestId('guess-container')).toHaveLength(GUESSES_AMOUNT)
  })
})
