import { ReactNode } from 'react'

export interface ButtonProps {
  onClick: () => void
  icon?: ReactNode
  text?: string
}
