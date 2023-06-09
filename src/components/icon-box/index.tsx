import React from 'react'
import { IconBoxProps, IconSizes } from './interfaces'

const IconBox: React.FC<IconBoxProps> = ({
  iconElement,
  size = 'md',
  color = 'slate-50',
  ...props
}) => {
  const iconSizes: Record<IconSizes, string> = {
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div
      className={`${iconSizes[size]} object-fit flex justify-center align-center text-${color}`}
      {...props}
    >
      {iconElement}
    </div>
  )
}

export default IconBox
