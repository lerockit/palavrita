import React from 'react'
import { AllowedLetters, KeyboardAction } from '../keyboard/interfaces'
import { HandleClickParam, KeyboardButtonProps } from './interfaces'

const handleClick = ({ action, letter }: HandleClickParam) => {
  if (letter) return handleLetterPress(letter)
  handleAction(action)
}

const handleLetterPress = (letter: AllowedLetters) => {
  console.log(letter)
}

const handleAction = (action: KeyboardAction | undefined) => {
  if (action === 'DELETE') return console.log('deletar')
  console.log('confirmar')
}

const a = () => 'aaa'

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  children,
  classes,
  action,
  letter,
}) => {
  return (
    <button
      className={`h-10 w-[10%] min-w-[1.75rem] flex justify-center items-center border-slate-50 border-2 rounded-sm font-medium text-lg ${classes}`}
      onClick={() => handleClick({ action, letter })}
    >
      {/* {letter || children} */}
      {a()}
    </button>
  )
}

export default KeyboardButton
