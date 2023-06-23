import { ReactNode } from 'react'
import { LetterStatus } from '../../contexts/global/interface'

export interface GuessLetterProps {
  children?: ReactNode
  isCurrent?: boolean
  letterStatus?: LetterStatus | null
  letterIndex: number
}
