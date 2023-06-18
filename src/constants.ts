import { KeyboardAction } from './components/keyboard/interfaces'

interface ActionsKeyMapper {
  [key: string]: KeyboardAction
}

export const WORD_SIZE = 5
export const GUESSES_AMOUNT = 6
export const ACTIONS_KEY_MAPPER: ActionsKeyMapper = {
  ENTER: 'CONFIRM',
  BACKSPACE: 'DELETE',
}
