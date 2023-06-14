import { ReactNode } from 'react'
import { AllowedLetters, KeyboardAction } from '../keyboard/interfaces'

export interface KeyboardButtonProps {
  children?: ReactNode
  classes?: string
  action?: KeyboardAction
  letter?: AllowedLetters
}
