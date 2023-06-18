import { render, screen } from '@testing-library/react'
import { useContext } from 'react'
import { act } from 'react-dom/test-utils'
import { describe } from 'vitest'
import GlobalProvider, { GlobalContext } from '../contexts/global'

describe('<GlobalProvider />', () => {
  const letterMock = 'A'
  const TestComponent = () => {
    const {
      actualGuess,
      allGuesses,
      hasError,
      setActualGuess,
      setAllGuesses,
      setHasError,
    } = useContext(GlobalContext)
    return (
      <>
        <div data-testid="actual-guess">
          <span>{actualGuess.word}</span>
          <span>{actualGuess.letters[0]}</span>
          <button
            data-testid="actual-guess-setter"
            onClick={() => setActualGuess([letterMock])}
          ></button>
        </div>
        <div data-testid="all-guesses">
          <span>{allGuesses[0]?.word}</span>
          <span>{allGuesses[0]?.letters[0]}</span>
          <button
            data-testid="all-guesses-setter"
            onClick={() =>
              setAllGuesses([{ word: letterMock, letters: [letterMock] }])
            }
          ></button>
        </div>
        <div data-testid="has-error">
          {hasError ? <span>error</span> : <></>}
          <button
            data-testid="has-error-setter"
            onClick={() => setHasError(true)}
          ></button>
        </div>
      </>
    )
  }

  it('Showing and setting actualGuess correctly', () => {
    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    act(() => screen.getByTestId('actual-guess-setter').click())

    const actualGuessElements = screen.getAllByText(letterMock)

    expect(actualGuessElements).toHaveLength(2)
  })

  it('Showing and setting allGuesses correctly', () => {
    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    act(() => screen.getByTestId('all-guesses-setter').click())

    const allGuessesElements = screen.getAllByText(letterMock)

    expect(allGuessesElements).toHaveLength(2)
  })

  it('Showing and setting hasError correctly', () => {
    render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    act(() => screen.getByTestId('has-error-setter').click())

    const errorElement = screen.getByText('error')

    expect(errorElement).toBeTruthy()
  })
})
