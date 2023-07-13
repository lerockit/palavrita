import React from 'react'
import IconBox from '../icon-box'
import { ButtonProps } from './interface'

const Button: React.FC<ButtonProps> = ({ onClick, icon, text }) => {
  return (
    <button
      className="drop-shadow rounded-sm px-4 py-2 border-2 border-slate-50 flex gap-4 font-medium items-center uppercase bg-purple-400"
      onClick={onClick}
    >
      <IconBox iconElement={icon} size="sm" />
      <span className="drop-shadow">{text}</span>
    </button>
  )
}

export default Button
