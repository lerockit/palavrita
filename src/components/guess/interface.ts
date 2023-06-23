import { Guess } from '../../contexts/global/interface'

export interface GuessProps {
  guess?: Guess & { isCurrent?: boolean }
}
