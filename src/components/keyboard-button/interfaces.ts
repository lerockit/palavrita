import { ReactNode } from 'react'
import { AllowedLetter } from '../keyboard/interfaces'

export interface KeyboardButtonProps {
  handleClick: () => void
  children?: ReactNode
  classes?: string
  letter?: AllowedLetter
}
