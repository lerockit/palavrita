import { render } from '@testing-library/react'
import React, { useContext } from 'react'
import { act } from 'react-dom/test-utils'
import GlobalProvider, { GlobalContext } from '.'
import { AllowedLetterId } from '../../components/keyboard/interfaces'
import NotAllowedWordNotification from '../../components/notifications/not-allowed-word'
import WonGameNotification from '../../components/notifications/won-game'
import WordLengthSizeNotification from '../../components/notifications/word-length-size'
import { GUESSES_ANIMATION_DURATION_IN_MILISECONDS } from '../../constants'
import { asyncTimeout } from '../../test/utils'
import { Guesses, Letter } from './interface'

const addGuessMock = jest.fn()
const finishGameMock = jest.fn()
const refreshGameMock = jest.fn()
const getPayloadMock = jest.fn()
const notifyMock = jest.fn()

jest.mock('../../hooks/useGameStatusStorage', () => {
  return () => ({
    addGuess: addGuessMock,
    finishGame: finishGameMock,
    refreshGame: refreshGameMock,
    getPayload: getPayloadMock,
  })
})

jest.mock('../../hooks/useNotification', () => {
  return () => ({
    notify: notifyMock,
  })
})

jest.mock('../../database', () => ({
  allowedWords: ['BICHO', 'GRITO'],
}))

const fakeDailyWord = 'GRITO'

const fakeGetPayload = {
  dailyWord: fakeDailyWord,
  gameFinishStatus: null,
}

describe('<GlobalProvider />', () => {
  afterEach(() => jest.clearAllMocks())

  it('Should flat all Letters when get previousLetters', () => {
    const previousGuesses: Guesses = [
      {
        letters: [
          { id: 'A', status: null },
          { id: 'B', status: null },
        ],
        word: 'AB',
      },
      {
        letters: [
          { id: 'C', status: null },
          { id: 'D', status: null },
        ],
        word: 'CD',
      },
    ]
    getPayloadMock.mockReturnValue({
      ...fakeGetPayload,
      guesses: previousGuesses,
    })
    const TestComponent = () => {
      const { getPreviousLetters } = useContext(GlobalContext)
      const previousLetters = getPreviousLetters()
      return (
        <>
          {previousLetters.map((previousLetter) => (
            <React.Fragment key={previousLetter.id}>
              {previousLetter.id}
            </React.Fragment>
          ))}
        </>
      )
    }

    const { getByText } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    expect(getByText('ABCD')).toBeInTheDocument()
  })

  it('Should addLetter to currentGuess if word length is smaller than WORD_SIZE and gameFinishStatus is null', () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    const TestComponent = () => {
      const fakeLetter: Letter = { id: 'A', status: null }
      const { addLetter, currentGuess } = useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-button"
            onClick={() => addLetter(fakeLetter)}
          ></button>
          <span data-testid="test-component-letters-length">
            {currentGuess.letters.length}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const button = getByTestId('test-component-button')

    act(() => button.click())

    expect(getByTestId('test-component-letters-length')).toHaveTextContent('1')
  })

  it('Should not addLetter to currentGuess if word length is larger or equal than WORD_SIZE', () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    const TestComponent = () => {
      const fakeLetter: Letter = { id: 'A', status: null }
      const { addLetter, currentGuess } = useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-button"
            onClick={() => addLetter(fakeLetter)}
          ></button>
          <span data-testid="test-component-letters-length">
            {currentGuess.letters.length}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const button = getByTestId('test-component-button')

    act(() => button.click())
    act(() => button.click())
    act(() => button.click())
    act(() => button.click())
    act(() => button.click())
    act(() => button.click())

    expect(getByTestId('test-component-letters-length')).toHaveTextContent('5')
  })

  it('Should not addLetter to currentGuess if gameFinishStatus is not null', () => {
    getPayloadMock.mockReturnValue({
      ...fakeGetPayload,
      gameFinishStatus: 'LOST',
    })
    const TestComponent = () => {
      const fakeLetter: Letter = { id: 'A', status: null }
      const { addLetter, currentGuess } = useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-button"
            onClick={() => addLetter(fakeLetter)}
          ></button>
          <span data-testid="test-component-letters-length">
            {currentGuess.letters.length}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const button = getByTestId('test-component-button')

    act(() => button.click())

    expect(getByTestId('test-component-letters-length')).toHaveTextContent('0')
  })

  it('Should removeLetter from currentGuess and set hasError to false', () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    const TestComponent = () => {
      const fakeLetter: Letter = { id: 'A', status: null }
      const {
        addLetter,
        currentGuess,
        removeLetter,
        confirmCurrentGuess,
        hasError,
      } = useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-add-button"
            onClick={() => addLetter(fakeLetter)}
          ></button>
          <button
            data-testid="test-component-confirm-button"
            onClick={() => confirmCurrentGuess()}
          ></button>
          <button
            data-testid="test-component-remove-button"
            onClick={() => removeLetter()}
          ></button>
          <span data-testid="test-component-letters-length">
            {currentGuess.letters.length}
          </span>
          <span data-testid="test-component-has-error">
            {hasError ? 'error' : 'correct'}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addButton = getByTestId('test-component-add-button')
    const removeButton = getByTestId('test-component-remove-button')
    const confirmButton = getByTestId('test-component-confirm-button')

    act(() => addButton.click())
    act(() => addButton.click())
    act(() => addButton.click())
    act(() => addButton.click())
    act(() => addButton.click())

    act(() => confirmButton.click())

    expect(getByTestId('test-component-has-error')).toHaveTextContent('error')

    act(() => removeButton.click())

    expect(getByTestId('test-component-letters-length')).toHaveTextContent('4')
    expect(getByTestId('test-component-has-error')).toHaveTextContent('correct')
  })

  it('Should do nothing in removeLetter when currentGuess word length is 0', () => {
    getPayloadMock.mockReturnValue(fakeGetPayload)
    const TestComponent = () => {
      const { currentGuess, removeLetter } = useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-remove-button"
            onClick={() => removeLetter()}
          ></button>
          <span data-testid="test-component-letters-length">
            {currentGuess.letters.length}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const removeButton = getByTestId('test-component-remove-button')

    act(() => removeButton.click())

    expect(getByTestId('test-component-letters-length')).toHaveTextContent('0')
  })

  it('Should addPreviousGuesses when confirmCurrentGuess and call addGuess from useStatusGameStorage with correct params', () => {
    getPayloadMock.mockReturnValue({ ...fakeGetPayload, guesses: ['mock'] })
    const TestComponent = () => {
      const lettersIdMock: AllowedLetterId[] = ['B', 'I', 'C', 'H', 'O']
      const { addLetter, confirmCurrentGuess, previousGuesses } =
        useContext(GlobalContext)
      return (
        <>
          {lettersIdMock.map((letterId) => {
            return (
              <button
                data-testid="test-component-add-button"
                onClick={() => addLetter({ id: letterId, status: null })}
                key={letterId}
              ></button>
            )
          })}
          <button
            data-testid="test-component-confirm-button"
            onClick={() => confirmCurrentGuess()}
          ></button>
          <span data-testid="test-component-previous-guesses-length">
            {previousGuesses.length}
          </span>
        </>
      )
    }

    const { getByTestId, getAllByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addButtons = getAllByTestId('test-component-add-button')
    const confirmButton = getByTestId('test-component-confirm-button')

    addButtons.forEach((button) => act(() => button.click()))
    act(() => confirmButton.click())

    expect(
      getByTestId('test-component-previous-guesses-length')
    ).toHaveTextContent('2')
    expect(addGuessMock).toHaveBeenCalledTimes(1)
    expect(addGuessMock).toHaveBeenCalledWith({
      word: 'BICHO',
      letters: [
        { id: 'B', status: 'INCORRECT' },
        { id: 'I', status: 'DISPLACED' },
        { id: 'C', status: 'INCORRECT' },
        { id: 'H', status: 'INCORRECT' },
        { id: 'O', status: 'CORRECT' },
      ],
    })
  })

  it('Should not addPreviousGuesses and call notify when confirm with currentGuess word length smaller than WORD_SIZE', () => {
    getPayloadMock.mockReturnValue({ ...fakeGetPayload, guesses: ['mock'] })
    const TestComponent = () => {
      const fakeLetter: Letter = { id: 'A', status: null }
      const { addLetter, confirmCurrentGuess, previousGuesses } =
        useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-add-button"
            onClick={() => addLetter(fakeLetter)}
          ></button>
          <button
            data-testid="test-component-confirm-button"
            onClick={() => confirmCurrentGuess()}
          ></button>
          <span data-testid="test-component-previous-guesses-length">
            {previousGuesses.length}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addButton = getByTestId('test-component-add-button')
    const confirmButton = getByTestId('test-component-confirm-button')

    act(() => addButton.click())
    act(() => confirmButton.click())

    expect(
      getByTestId('test-component-previous-guesses-length')
    ).toHaveTextContent('1')
    expect(notifyMock).toBeCalledTimes(1)
    expect(notifyMock).toBeCalledWith(WordLengthSizeNotification, {
      theme: 'ERROR',
    })
  })

  it('Should set hasError true when currentGuess word is not included in allowedWords', () => {
    getPayloadMock.mockReturnValue({ ...fakeGetPayload, guesses: ['mock'] })
    const TestComponent = () => {
      const fakeLetter: Letter = { id: 'A', status: null }
      const { addLetter, confirmCurrentGuess, hasError } =
        useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-add-button"
            onClick={() => addLetter(fakeLetter)}
          ></button>
          <button
            data-testid="test-component-confirm-button"
            onClick={() => confirmCurrentGuess()}
          ></button>
          <span data-testid="test-component-has-error">
            {hasError ? 'error' : 'correct'}
          </span>
        </>
      )
    }

    const { getByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addButton = getByTestId('test-component-add-button')
    const confirmButton = getByTestId('test-component-confirm-button')

    act(() => addButton.click())
    act(() => addButton.click())
    act(() => addButton.click())
    act(() => addButton.click())
    act(() => addButton.click())
    act(() => confirmButton.click())

    expect(getByTestId('test-component-has-error')).toHaveTextContent('error')
    expect(notifyMock).toBeCalledTimes(1)
    expect(notifyMock).toBeCalledWith(NotAllowedWordNotification, {
      theme: 'ERROR',
    })
  })

  it('Should finishGame, call finishGame from useGameStatusStorage with correct params and call notify with correct params when allLettersMatch', async () => {
    getPayloadMock.mockReturnValue({ ...fakeGetPayload, guesses: ['mock'] })
    const TestComponent = () => {
      const lettersIdMock: AllowedLetterId[] = ['G', 'R', 'I', 'T', 'O']
      const { addLetter, confirmCurrentGuess, gameFinishStatus } =
        useContext(GlobalContext)
      return (
        <>
          {lettersIdMock.map((letterId) => {
            return (
              <button
                data-testid="test-component-add-button"
                onClick={() => addLetter({ id: letterId, status: null })}
                key={letterId}
              ></button>
            )
          })}
          <button
            data-testid="test-component-confirm-button"
            onClick={() => confirmCurrentGuess()}
          ></button>
          <span data-testid="test-component-game-finish-status">
            {gameFinishStatus}
          </span>
        </>
      )
    }

    const { getByTestId, getAllByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addButtons = getAllByTestId('test-component-add-button')
    const confirmButton = getByTestId('test-component-confirm-button')

    addButtons.forEach((button) => act(() => button.click()))
    act(() => confirmButton.click())

    await act(
      async () =>
        await asyncTimeout(GUESSES_ANIMATION_DURATION_IN_MILISECONDS + 100)
    )

    expect(getByTestId('test-component-game-finish-status')).toHaveTextContent(
      'WON'
    )
    expect(finishGameMock).toHaveBeenCalledTimes(1)
    expect(finishGameMock).toHaveBeenCalledWith('WON')
    expect(notifyMock).toHaveBeenCalledTimes(1)
    expect(notifyMock).toHaveBeenCalledWith(WonGameNotification, {
      contentProps: { guessIndex: 2 },
    })
  })

  it('Should finishGame and call finishGame from useGameStatusStorage with correct params when allLettersMatch', async () => {
    getPayloadMock.mockReturnValue({
      ...fakeGetPayload,
      guesses: ['mock', 'mock', 'mock', 'mock', 'mock'],
    })
    const TestComponent = () => {
      const lettersIdMock: AllowedLetterId[] = ['B', 'I', 'C', 'H', 'O']
      const { addLetter, confirmCurrentGuess, gameFinishStatus } =
        useContext(GlobalContext)
      return (
        <>
          {lettersIdMock.map((letterId) => {
            return (
              <button
                data-testid="test-component-add-button"
                onClick={() => addLetter({ id: letterId, status: null })}
                key={letterId}
              ></button>
            )
          })}
          <button
            data-testid="test-component-confirm-button"
            onClick={() => confirmCurrentGuess()}
          ></button>
          <span data-testid="test-component-game-finish-status">
            {gameFinishStatus}
          </span>
        </>
      )
    }

    const { getByTestId, getAllByTestId } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addButtons = getAllByTestId('test-component-add-button')
    const confirmButton = getByTestId('test-component-confirm-button')

    addButtons.forEach((button) => act(() => button.click()))
    act(() => confirmButton.click())

    await act(
      async () =>
        await asyncTimeout(GUESSES_ANIMATION_DURATION_IN_MILISECONDS + 100)
    )

    expect(getByTestId('test-component-game-finish-status')).toHaveTextContent(
      'LOST'
    )
    expect(finishGameMock).toHaveBeenCalledTimes(1)
    expect(finishGameMock).toHaveBeenCalledWith('LOST')
  })

  it('Should call refreshGame from useGameStatusStorage and cleaning context when refreshGame is called', () => {
    const previousGuesses: Guesses = [
      {
        letters: [{ id: 'A', status: null }],
        word: 'A',
      },
    ]
    getPayloadMock.mockReturnValue({
      ...fakeGetPayload,
      guesses: previousGuesses,
    })

    const TestComponent = () => {
      const { refreshGame, addLetter, currentGuess, previousGuesses } =
        useContext(GlobalContext)
      return (
        <>
          <button
            data-testid="test-component-refresh-button"
            onClick={refreshGame}
          />
          <button
            data-testid="test-component-add-button"
            onClick={() => addLetter({ id: 'B', status: null })}
          ></button>
          <span>{previousGuesses[0] ? previousGuesses[0].word : ''}</span>
          <span>{currentGuess ? currentGuess.word : ''}</span>
        </>
      )
    }

    const { getByText, getByTestId, queryByText } = render(
      <GlobalProvider>
        <TestComponent />
      </GlobalProvider>
    )

    const addLetterButton = getByTestId('test-component-add-button')
    const refreshButton = getByTestId('test-component-refresh-button')

    act(() => addLetterButton.click())

    expect(getByText('A')).toBeInTheDocument()
    expect(getByText('B')).toBeInTheDocument()

    act(() => refreshButton.click())

    expect(refreshGameMock).toHaveBeenCalledTimes(1)
    expect(queryByText('A')).not.toBeInTheDocument()
    expect(queryByText('B')).not.toBeInTheDocument()
  })
})
