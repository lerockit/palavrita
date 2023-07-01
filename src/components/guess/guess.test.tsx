import { render } from '@testing-library/react'
import Guess from '.'
import { WORD_SIZE } from '../../constants'
import { Guess as GuessType } from '../../contexts/global/interface'

describe('<Guess />', () => {
  it('Sould render GuessLetters with correct length and no content when guess prop is not passed', () => {
    const { getAllByTestId } = render(<Guess />)
    const guessLetters = getAllByTestId('guess-letter')
    expect(guessLetters).toHaveLength(WORD_SIZE)
    expect(guessLetters[0].children.length).toBe(0)
  })

  it('Sould render GuessLetters with content when guess prop is passed', () => {
    const fakeGuess: GuessType = {
      letters: [{ id: 'A', status: 'CORRECT' }],
      word: 'A',
    }
    const { getAllByTestId } = render(<Guess guess={fakeGuess} />)
    const guessLetters = getAllByTestId('guess-letter')
    expect(guessLetters[0].children.length).not.toBe(0)
  })
})
