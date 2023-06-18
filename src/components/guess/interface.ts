import { Guess, GuessWithStatus } from '../../contexts/global/interface'

export interface GuessProps {
  guess?: GuessWithStatus | (Guess & { isCurrent?: boolean })
}
