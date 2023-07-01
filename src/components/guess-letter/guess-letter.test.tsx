import GuessLetter from '.'
import { GlobalContextInterface } from '../../contexts/global/interface'
import { renderWithGlobalContext } from '../../test/setup'

describe('<GuessLetter />', () => {
  const fakeContext: Partial<GlobalContextInterface> = {
    gameFinishStatus: null,
  }

  it('Should render with right classes when letterStatus == CORRECT', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} letterStatus="CORRECT" />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'bg-emerald-500'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })

  it('Should render with right classes when letterStatus == DISPLACED', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} letterStatus="DISPLACED" />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'bg-amber-500'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })

  it('Should render with right border classes when isCurrent is true hasError is false and isSelected is false', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={2} isCurrent={true} />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'border-slate-50 border-2'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })

  it('Should render with right border classes when isCurrent is false', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} isCurrent={false} />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'border-slate-50 border-2'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })

  it('Should render with right border classes when gameFinishStatus is not null', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} isCurrent={false} />,
      { ...fakeContext, gameFinishStatus: 'WON' }
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'border-slate-50 border-2'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })

  it('Should render with right border classes when hasError is true and isCurrent is true', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} isCurrent={true} />,
      { ...fakeContext, hasError: true }
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'border-pink-600 border-2'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })

  it('Should render with right border classes when isSelected is true', () => {
    const { getByTestId } = renderWithGlobalContext(
      <GuessLetter letterIndex={0} isCurrent={true} />,
      fakeContext
    )

    const letterStatusElement = getByTestId('guess-letter')
    const expectedClases = 'border-[3px] border-b-[6px]'

    expect(letterStatusElement).toHaveClass(expectedClases)
  })
})
