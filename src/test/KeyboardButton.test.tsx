import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import KeyboardButton from '../components/keyboard-button'

vi.mock('../components/keyboard-button', async (importOriginal) => {
  const handleLetterPressMock = vi.fn()
  const handleActionMock = vi.fn()
  const original = await importOriginal()
  return {
    ...(original as any),
    handleLetterPress: handleLetterPressMock,
    handleAction: handleActionMock,
    a: vi.fn().mockReturnValue('bbb'),
  }
})

describe('<KeyboardButton />', () => {
  // afterEach(() => {
  //   vi.clearAllMocks()
  // })

  // it('Should render letter and not children element when letter is passed as props', () => {
  //   const letterMock = 'A'
  //   const mockChildren = <div data-testid="mock-children"></div>
  //   render(<KeyboardButton letter={letterMock}>{mockChildren}</KeyboardButton>)
  //   const letterElement = screen.queryByText(letterMock)
  //   const childrenElement = screen.queryByTestId('mock-children')
  //   expect(letterElement).toBeInTheDocument()
  //   expect(childrenElement).not.toBeInTheDocument()
  // })

  // it('Should render children when a letter is not passed as props', () => {
  //   const mockChildren = <div data-testid="mock-children"></div>
  //   render(<KeyboardButton>{mockChildren}</KeyboardButton>)
  //   const childrenElement = screen.queryByTestId('mock-children')
  //   expect(childrenElement).toBeInTheDocument()
  // })

  it('Should call handleLetterPress when a letter is passed as props', () => {
    render(<KeyboardButton letter="A" />)
    expect(screen.queryByText('aaa')).toBeInTheDocument()
  })
})
