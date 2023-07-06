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

export const LINKS = {
  INSTAGRAM: 'http://instagram.com/lerockit',
  GITHUB_PALAVRITA: 'http://github.com/lerockit/palavrita',
  WORDLE: 'https://www.nytimes.com/games/wordle/index.html',
  LETRECO: 'https://www.gabtoschi.com/letreco/',
  TERMO: 'https://term.ooo/',
  CHARADA: 'https://charada.vercel.app/',
}

export const GUESS_ANIMATION_DELAY = 0.2
export const GUESS_ANIMATION_DURATION_IN_SECONDS = 0.5
export const GUESS_ANIMATION_DURATION_IN_MILISECONDS =
  GUESS_ANIMATION_DURATION_IN_SECONDS * 1000
export const GUESSES_ANIMATION_DURATION_IN_MILISECONDS =
  GUESS_ANIMATION_DURATION_IN_MILISECONDS +
  (WORD_SIZE - 1) * GUESS_ANIMATION_DELAY * 1000
