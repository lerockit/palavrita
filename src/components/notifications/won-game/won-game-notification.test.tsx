import { render } from '@testing-library/react'
import WonGameNotification from '.'

describe('<WonGameNotification />', () => {
  it('Should show correct message if guessIndex is a valid index', () => {
    const { getByText } = render(<WonGameNotification guessIndex={2} />)
    expect(getByText('Fantástico!')).toBeInTheDocument()
  })

  it('Should show correct message if guessIndex is a invalid index', () => {
    const { getByText } = render(<WonGameNotification guessIndex={10000000} />)
    expect(getByText('Ufa!')).toBeInTheDocument()
  })
})
