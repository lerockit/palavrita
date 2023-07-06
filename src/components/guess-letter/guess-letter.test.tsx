import GuessLetter from '.'
import { GUESS_ANIMATION_DURATION_IN_MILISECONDS } from '../../constants'
import { GlobalContextInterface } from '../../contexts/global/interface'
import { renderWithGlobalContext, waitForAnimation } from '../../test/utils'
import { hex2rgba } from '../../utils/hex-transform'
import theme from '../../utils/tw-config'

describe('<GuessLetter />', () => {
  const fakeContext: Partial<GlobalContextInterface> = {
    gameFinishStatus: null,
  }

  it('Should render with correct styles when letterStatus is equal to CORRECT', async () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} letterStatus="CORRECT" />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedStyle = {
      backgroundColor: hex2rgba(theme.backgroundColor.emerald[500]),
    }

    await waitForAnimation(() => {
      expect(letterStatusElement).toHaveStyle(expectedStyle)
    }, GUESS_ANIMATION_DURATION_IN_MILISECONDS)
  })

  it('Should render with correct styles when letterStatus is equal to DISPLACED', async () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} letterStatus="DISPLACED" />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedStyle = {
      backgroundColor: hex2rgba(theme.backgroundColor.amber[500]),
    }

    await waitForAnimation(() => {
      expect(letterStatusElement).toHaveStyle(expectedStyle)
    }, GUESS_ANIMATION_DURATION_IN_MILISECONDS)
  })

  it('Should render with correct styles when letterStatus is equal to INCORRECT', async () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} letterStatus="INCORRECT" />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedStyle = {
      backgroundColor: hex2rgba(theme.backgroundColor.pink[600]),
    }

    await waitForAnimation(() => {
      expect(letterStatusElement).toHaveStyle(expectedStyle)
    }, GUESS_ANIMATION_DURATION_IN_MILISECONDS)
  })

  it('Should render with correct border styles when currentGuess letters length is equal to letterIndex, isCurrent is true and gameFinishStatus is false', async () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={2} isCurrent={true} />,
      {
        ...fakeContext,
        currentGuess: {
          letters: [
            { id: 'A', status: null },
            { id: 'B', status: null },
          ],
          word: 'AB',
        },
      }
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedStyle = {
      borderBottomWidth: '6px',
    }

    await waitForAnimation(() => {
      expect(letterStatusElement).toHaveStyle(expectedStyle)
    }, GUESS_ANIMATION_DURATION_IN_MILISECONDS)
  })

  it('Should render with correct border styles when isCurrent is false', async () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} isCurrent={false} />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedStyle = {
      borderBottomWidth: theme.borderWidth[2],
    }

    await waitForAnimation(() => {
      expect(letterStatusElement).toHaveStyle(expectedStyle)
    }, GUESS_ANIMATION_DURATION_IN_MILISECONDS)
  })

  it('Should render with correct border classes when hasError is true and isCurrent is true', async () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={1} isCurrent={true} />,
      { ...fakeContext, hasError: true }
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedStyle = {
      borderColor: hex2rgba(theme.backgroundColor.pink[600]),
    }

    await waitForAnimation(() => {
      console.log(letterStatusElement.style.borderColor)
      expect(letterStatusElement).toHaveStyle(expectedStyle)
    }, GUESS_ANIMATION_DURATION_IN_MILISECONDS)
  })
})
