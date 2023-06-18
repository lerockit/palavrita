import React from 'react'
import { KeyboardButtonProps } from './interfaces'

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
  children,
  classes,
  handleClick,
  letter,
  ...buttonProps
}) => {
  return (
    <button
      className={`h-10 w-[10%] min-w-[1.75rem] flex justify-center items-center border-slate-50 border-2 rounded-sm font-medium text-lg ${classes}`}
      onClick={handleClick}
      {...buttonProps}
    >
      {letter || children}
    </button>
  )
}

export default KeyboardButton
