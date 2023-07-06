import { ReactNode } from 'react'
import { AllowedLetterId } from '../keyboard/interfaces'

export interface KeyboardButtonProps {
  handleClick: () => void
  children?: ReactNode
  classes?: string
  letterId?: AllowedLetterId
}
