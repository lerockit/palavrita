import React, { ReactNode } from 'react'
import IconBox from '../icon-box'
import BackspaceIcon from '../icons/backspace'
import KeyboardButton from '../keyboard-button'
import {
  AllowedLetters,
  KeyboardAction,
  KeyboardActionButton,
} from './interfaces'

const splittedLettersGroups: AllowedLetters[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const keyboardActionButtons: KeyboardActionButton[] = [
  { keyboardRow: 1, action: 'DELETE' },
  { keyboardRow: 2, action: 'CONFIRM' },
]

const Keyboard: React.FC = () => {
  const getKeyboardActionButtonElement = (action: KeyboardAction) => {
    const actionsElement: Record<KeyboardAction, ReactNode> = {
      DELETE: (
        <KeyboardButton classes="bg-slate-50" action="DELETE">
          <IconBox iconElement={BackspaceIcon} color="purple-500" size="lg" />
        </KeyboardButton>
      ),
      CONFIRM: (
        <KeyboardButton
          classes="w-[30%] bg-slate-50 text-purple-500"
          action="CONFIRM"
        >
          ENTER
        </KeyboardButton>
      ),
    }

    return actionsElement[action]
  }

  const getKeyboardActionButtonByRow: (row: number) => ReactNode = (
    row: number
  ) => {
    const keyboardActionButton = keyboardActionButtons.find(
      ({ keyboardRow }) => keyboardRow === row
    )
    return keyboardActionButton ? (
      getKeyboardActionButtonElement(keyboardActionButton.action)
    ) : (
      <></>
    )
  }

  return (
    <div className="w-full px-2 flex flex-col gap-4">
      {splittedLettersGroups.map((splittedLetters, keyboardRow) => (
        <div className="flex gap-2" key={keyboardRow}>
          {splittedLetters.map((letter) => (
            <KeyboardButton key={letter} letter={letter} />
          ))}
          {getKeyboardActionButtonByRow(keyboardRow)}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
