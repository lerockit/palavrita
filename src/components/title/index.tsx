import React from 'react'
import { TitleProps } from './interface'

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <div className="font-bold text-slate-50 text-4xl uppercase drop-shadow text-center">
      {children}
    </div>
  )
}

export default Title
