import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/global'
import { LetterStatus } from '../../contexts/global/interface'
import { KeyboardButtonProps } from './interfaces'

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  children,
  classes,
  handleClick,
  letterId,
  ...buttonProps
}) => {
  const { getPreviousLetters } = useContext(GlobalContext)

  const haveStatus = (status: LetterStatus) => {
    const previousLetters = getPreviousLetters()
    const lettersFiltered = previousLetters.filter(
      (previousLetter) => previousLetter.status === status
    )

    return !!lettersFiltered.find(({ id }) => id === letterId)
  }

  const isIncorrect = haveStatus('INCORRECT')
  const isDisplaced = haveStatus('DISPLACED')
  const isCorrect = haveStatus('CORRECT')

  const opacityClasses = isIncorrect ? 'opacity-50' : ''
  const shadowClasses = isIncorrect ? '' : 'shadow'
  const getBorderClasses = () => {
    if (isIncorrect) return ''
    if (isCorrect) return 'border-emerald-300 border-2'
    if (isDisplaced) return 'border-amber-300 border-2'
    return 'border-slate-50 border-2'
  }
  const getBackgroundClasses = () => {
    if (isCorrect) return 'bg-emerald-500'
    if (isDisplaced) return 'bg-amber-500'
  }

  return (
    <button
      className={`
        h-10 w-[10%] min-w-[1.75rem] flex justify-center items-center rounded-sm font-medium text-lg
        ${classes}
        ${opacityClasses}
        ${shadowClasses}
        ${getBorderClasses()}
        ${getBackgroundClasses()}
      `}
      onClick={handleClick}
      {...buttonProps}
    >
      <span className="drop-shadow">{letterId || children}</span>
    </button>
  )
}

export default KeyboardButton
