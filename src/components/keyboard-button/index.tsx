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

  //TODO: MELHORAR ESSAS LÓGICAS E DEIXAR MAIS LIMPO ESTE COMPONENT

  const getStatus = (): LetterStatus | void => {
    const previousLetters = getPreviousLetters()
    const lettersFiltered = previousLetters.filter(({ id }) => id === letterId)
    if (lettersFiltered.find(({ status }) => status === 'CORRECT'))
      return 'CORRECT'
    if (lettersFiltered.find(({ status }) => status === 'DISPLACED'))
      return 'DISPLACED'
    if (lettersFiltered.find(({ status }) => status === 'INCORRECT'))
      return 'INCORRECT'
  }

  const status = getStatus()

  const isIncorrect = status === 'INCORRECT'
  const isDisplaced = status === 'DISPLACED'
  const isCorrect = status === 'CORRECT'

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
        h-12 w-[10%] min-w-[1.75rem] flex justify-center items-center rounded-sm font-medium text-lg
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
