import { ReactNode } from 'react'

export interface IconBoxProps {
  iconElement: ReactNode
  size?: IconSizes
  color?: string
  classes?: string
  hasShadow?: boolean
}

export type IconSizes = 'sm' | 'md' | 'lg'
