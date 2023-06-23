import React from 'react'
import { IconBoxProps, IconSizes } from './interfaces'

const IconBox: React.FC<IconBoxProps> = ({
  iconElement,
  size = 'md',
  color = 'slate-50',
  hasShadow = true,
  ...props
}) => {
  const iconSizes: Record<IconSizes, string> = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const shadowClasses = hasShadow ? 'drop-shadow' : ''

  return (
    <div
      className={`
        object-fit flex justify-center align-center
        text-${color}
        ${iconSizes[size]}
        ${shadowClasses}
      `}
      {...props}
    >
      {iconElement}
    </div>
  )
}

export default IconBox
