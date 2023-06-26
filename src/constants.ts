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

export const INSTAGRAM_LINK = 'http://instagram.com/lerockit'

export const GITHUB_PALAVRITA_LINK = 'http://github.com/lerockit/palavrita'
