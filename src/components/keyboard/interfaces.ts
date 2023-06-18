export interface KeyboardActionButton {
  // Row starts from 0
  keyboardRow: number
  action: KeyboardAction
}

export type KeyboardAction = 'CONFIRM' | 'DELETE'

export type AllowedLetter =
  | 'Q'
  | 'W'
  | 'E'
  | 'R'
  | 'T'
  | 'Y'
  | 'U'
  | 'I'
  | 'O'
  | 'P'
  | 'A'
  | 'S'
  | 'D'
  | 'F'
  | 'G'
  | 'H'
  | 'J'
  | 'K'
  | 'L'
  | 'Z'
  | 'X'
  | 'C'
  | 'V'
  | 'B'
  | 'N'
  | 'M'

export type KeyboardButtonHandler = (
  params: KeyboardButtonHandlerParams
) => void

interface KeyboardButtonHandlerParams {
  letter?: AllowedLetter
  action?: KeyboardAction
}
