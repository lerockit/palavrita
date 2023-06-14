import React, { useContext } from 'react'
import { WORD_SIZE } from '../../constants'
import { GlobalContext } from '../../contexts/global'
import { AllowedLetters, KeyboardAction } from '../keyboard/interfaces'
import { KeyboardButtonProps } from './interfaces'

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  children,
  classes,
  action,
  letter,
}) => {
  const { setActualGuess, actualGuess } = useContext(GlobalContext)

  const handleClick = () => {
    if (letter) return handleLetterPress(letter)
    handleAction(action)
  }

  const handleLetterPress = (letter: AllowedLetters) => {
    if (actualGuess.letters.length >= WORD_SIZE) return
    setActualGuess([...actualGuess.letters, letter])
  }

  const handleAction = (action: KeyboardAction | undefined) => {
    if (action === 'DELETE') return handleDeletePress()
    console.log('confirmar')
  }

  const handleDeletePress = () => {
    if (!actualGuess.letters.length) return
    setActualGuess([...actualGuess.letters].slice(0, -1))
  }

  return (
    <button
      className={`h-10 w-[10%] min-w-[1.75rem] flex justify-center items-center border-slate-50 border-2 rounded-sm font-medium text-lg ${classes}`}
      onClick={handleClick}
    >
      {letter || children}
    </button>
  )
}

export default KeyboardButton
