import { ReactNode } from 'react'

export interface IconBoxProps {
  iconElement: ReactNode
  size?: IconSizes
  color?: string
  classes?: string
}

export type IconSizes = 'md' | 'lg'
