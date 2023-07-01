import { vi } from 'vitest'
import KeyboardButton from '.'
import { GlobalContextInterface, Letter } from '../../contexts/global/interface'
import { renderWithGlobalContext } from '../../test/setup'

describe('<KeyboardButton />', () => {
  const handleClickMock = vi.fn()
  const fakeLetter: Letter = { id: 'A', status: null }
  const getPreviousLetters = (): Letter[] => [fakeLetter]
  const fakeContext: Partial<GlobalContextInterface> = { getPreviousLetters }

  it('Should render correctly classes when letter status is CORRECT', () => {
    const { getByText } = renderWithGlobalContext(
      <KeyboardButton handleClick={handleClickMock} letterId={fakeLetter.id} />,
      {
        ...fakeContext,
        getPreviousLetters: () => [{ ...fakeLetter, status: 'CORRECT' }],
      }
    )
    const expectedClasses = 'border-emerald-300 border-2 bg-emerald-500 shadow'

    expect(getByText(fakeLetter.id).parentElement).toHaveClass(expectedClasses)
  })

  it('Should render correctly classes when letter status is DISPLACED', () => {
    const { getByText } = renderWithGlobalContext(
      <KeyboardButton handleClick={handleClickMock} letterId={fakeLetter.id} />,
      {
        ...fakeContext,
        getPreviousLetters: () => [{ ...fakeLetter, status: 'DISPLACED' }],
      }
    )
    const expectedClasses = 'border-amber-300 border-2 bg-amber-500 shadow'

    expect(getByText(fakeLetter.id).parentElement).toHaveClass(expectedClasses)
  })

  it('Should render correctly classes when letter status is INCORRECT', () => {
    const { getByText } = renderWithGlobalContext(
      <KeyboardButton handleClick={handleClickMock} letterId={fakeLetter.id} />,
      {
        ...fakeContext,
        getPreviousLetters: () => [{ ...fakeLetter, status: 'INCORRECT' }],
      }
    )
    const expectedClasses = 'opacity-50'

    expect(getByText(fakeLetter.id).parentElement).toHaveClass(expectedClasses)
  })

  it('Should render correctly classes when letter status is NULL', () => {
    const { getByText } = renderWithGlobalContext(
      <KeyboardButton handleClick={handleClickMock} letterId={fakeLetter.id} />,
      fakeContext
    )
    const expectedClasses = 'border-slate-50 border-2 shadow'

    expect(getByText(fakeLetter.id).parentElement).toHaveClass(expectedClasses)
  })
})
