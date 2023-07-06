import { fireEvent } from '@testing-library/react'
import Keyboard from '.'
import { GlobalContextInterface, Letter } from '../../contexts/global/interface'
import { renderWithGlobalContext } from '../../test/utils'

describe('<Keyboard />', () => {
  const letterMock: Letter = { id: 'A', status: 'INCORRECT' }
  const fakeContext: Partial<GlobalContextInterface> = {
    getPreviousLetters: () => [letterMock],
  }

  it('Should render all keyboard buttons', () => {
    const BUTTONS_AMOUNT = 28
    const { getAllByRole } = renderWithGlobalContext(<Keyboard />, fakeContext)
    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(BUTTONS_AMOUNT)
  })

  it('Should call addLetter passing correct params when a letterButton is clicked', () => {
    const addLetter = jest.fn()
    const { id } = letterMock
    const { getByText } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      addLetter,
    })
    const letterButton = getByText(id)
    letterButton.click()
    expect(addLetter).toBeCalledWith({ id, status: null })
  })

  it('Should call addLetter passing correct params when a letter key is pressed', () => {
    const addLetter = jest.fn()
    const { id } = letterMock
    const { container } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      addLetter,
    })
    fireEvent.keyDown(container, { key: 'a' })
    expect(addLetter).toBeCalledWith({ id, status: null })
  })

  it('Should not call actualGuess setter when a not allowed letter key is pressed', () => {
    const addLetter = jest.fn()
    const { container } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      addLetter,
    })
    fireEvent.keyDown(container, { key: 'ç' })
    expect(addLetter).not.toBeCalled()
  })

  it('Should call removeLetter when delete button is clicked', () => {
    const removeLetter = jest.fn()
    const { getByTestId } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      removeLetter,
    })
    const deleteButton = getByTestId('delete-button')
    deleteButton.click()
    expect(removeLetter).toBeCalled()
  })

  it('Should call removeLetter when backspace key is pressed', () => {
    const removeLetter = jest.fn()
    const { container } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      removeLetter,
    })
    fireEvent.keyDown(container, { key: 'Backspace' })
    expect(removeLetter).toBeCalled()
  })

  it('Should call confirmCurrentGuess when confirm button is clicked', () => {
    const confirmCurrentGuess = jest.fn()
    const { getByTestId } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      confirmCurrentGuess,
    })
    const confirmButton = getByTestId('confirm-button')
    confirmButton.click()
    expect(confirmCurrentGuess).toBeCalled()
  })

  it('Should call confirmCurrentGuess when enter key is pressed', () => {
    const confirmCurrentGuess = jest.fn()
    const { container } = renderWithGlobalContext(<Keyboard />, {
      ...fakeContext,
      confirmCurrentGuess,
    })
    fireEvent.keyDown(container, { key: 'Enter' })
    expect(confirmCurrentGuess).toBeCalled()
  })
})
