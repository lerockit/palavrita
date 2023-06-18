import { fireEvent, render, screen } from '@testing-library/react'
import { describe, vi } from 'vitest'
import Keyboard from '../components/keyboard'
import { Guess } from '../contexts/global/interface'
import { renderWithGlobalContext } from './setup'

describe('<Keyboard />', () => {
  it('Should render all keyboard buttons', () => {
    const BUTTONS_AMOUNT = 28
    render(<Keyboard />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(BUTTONS_AMOUNT)
  })

  it('Should call actualGuess setter passing correct params when a letterButton is clicked', () => {
    const setActualGuess = vi.fn()
    renderWithGlobalContext(<Keyboard />, { setActualGuess })
    const letterMock = 'A'
    const letterAButton = screen.getByText(letterMock)
    letterAButton.click()
    expect(setActualGuess).toBeCalledWith([letterMock])
  })

  it('Should call actualGuess setter passing correct params when a letter key is pressed', () => {
    const setActualGuess = vi.fn()
    const { container } = renderWithGlobalContext(<Keyboard />, {
      setActualGuess,
    })
    fireEvent.keyDown(container, { key: 'a' })
    expect(setActualGuess).toBeCalledWith(['A'])
  })

  it('Should not call actualGuess setter when a not allowed letter key is pressed', () => {
    const setActualGuess = vi.fn()
    const { container } = renderWithGlobalContext(<Keyboard />, {
      setActualGuess,
    })
    fireEvent.keyDown(container, { key: 'ç' })
    expect(setActualGuess).not.toBeCalled()
  })

  it('Should not call actualGuess setter when a letterButton is clicked and actualGuess word is larger than WORD_SIZE', () => {
    const setActualGuess = vi.fn()
    const actualGuess = { word: 'ABCDE' } as Guess
    renderWithGlobalContext(<Keyboard />, { setActualGuess, actualGuess })
    const letterMock = 'A'
    const letterAButton = screen.getByText(letterMock)
    letterAButton.click()
    expect(setActualGuess).not.toBeCalled()
  })

  it('Should call actualGuess setter passing correct params when delete button is clicked', () => {
    const setActualGuess = vi.fn()
    const actualGuess = { letters: ['A'], word: 'A' } as Guess
    renderWithGlobalContext(<Keyboard />, { setActualGuess, actualGuess })
    const deleteButton = screen.getByTestId('delete-button')
    deleteButton.click()
    expect(setActualGuess).toBeCalledWith([])
  })

  it('Should call actualGuess setter passing correct params when backspace key is pressed', () => {
    const setActualGuess = vi.fn()
    const actualGuess = { letters: ['A'], word: 'A' } as Guess
    const { container } = renderWithGlobalContext(<Keyboard />, {
      setActualGuess,
      actualGuess,
    })
    fireEvent.keyDown(container, { key: 'Backspace' })
    expect(setActualGuess).toBeCalledWith([])
  })

  it('Should not call actualGuess setter when delete button is clicked and word length is 0', () => {
    const setActualGuess = vi.fn()
    const actualGuess = { word: '' } as Guess
    renderWithGlobalContext(<Keyboard />, { setActualGuess, actualGuess })
    const deleteButton = screen.getByTestId('delete-button')
    deleteButton.click()
    expect(setActualGuess).not.toBeCalled()
  })

  it('Should call hasError setter with true param when confirm button is clicked and word length is smaller than WORD_SIZE', () => {
    const actualGuess = { word: '' } as Guess
    const setHasError = vi.fn()
    renderWithGlobalContext(<Keyboard />, { setHasError, actualGuess })
    const confirmButton = screen.getByTestId('confirm-button')
    confirmButton.click()
    expect(setHasError).toBeCalledWith(true)
  })
})
