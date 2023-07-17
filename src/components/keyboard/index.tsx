import React, { ReactNode, useCallback, useContext, useEffect } from 'react'
import { ACTIONS_KEY_MAPPER } from '../../constants'
import { GlobalContext } from '../../contexts/global'
import IconBox from '../icon-box'
import BackspaceIcon from '../icons/backspace'
import KeyboardButton from '../keyboard-button'
import {
  AllowedLetterId,
  KeyboardAction,
  KeyboardActionButton,
  KeyboardButtonHandler,
} from './interfaces'

const lettersIdsGroups: AllowedLetterId[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]

const allLetters = lettersIdsGroups.flat(2)

const keyboardActionButtons: KeyboardActionButton[] = [
  { keyboardRow: 1, action: 'DELETE' },
  { keyboardRow: 2, action: 'CONFIRM' },
]

const Keyboard: React.FC = () => {
  const { addLetter, removeLetter, confirmCurrentGuess, currentGuess } =
    useContext(GlobalContext)

  const handleClick: KeyboardButtonHandler = ({ letterId, action }) => {
    if (letterId) return handleLetterPress(letterId)
    handleAction(action)
  }

  const handleKeyDown: (e: KeyboardEvent) => void = useCallback(
    ({ key }) => {
      const keyPressed = key.toUpperCase()
      const action = ACTIONS_KEY_MAPPER[keyPressed]
      if (action) return handleAction(action)

      const isValidLetter = allLetters.includes(keyPressed as AllowedLetterId)

      if (isValidLetter) handleLetterPress(keyPressed as AllowedLetterId)
    },
    [currentGuess]
  )

  const handleLetterPress = (letterId: AllowedLetterId) =>
    addLetter({ id: letterId, status: null })

  const handleAction = (action: KeyboardAction | undefined) => {
    if (action === 'DELETE') return removeLetter()
    confirmCurrentGuess()
  }

  const getKeyboardActionButtonElement = (action: KeyboardAction) => {
    const actionsElement: Record<KeyboardAction, ReactNode> = {
      DELETE: (
        <KeyboardButton
          classes="bg-slate-50"
          handleClick={() => handleClick({ action: 'DELETE' })}
          aria-label="Deletar"
          data-testid="delete-button"
        >
          <IconBox iconElement={BackspaceIcon} color="purple-500" />
        </KeyboardButton>
      ),
      CONFIRM: (
        <KeyboardButton
          classes="w-[30%] bg-slate-50 text-purple-500"
          handleClick={() => handleClick({ action: 'CONFIRM' })}
          aria-label="Confirmar"
          data-testid="confirm-button"
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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentGuess])

  return (
    <div
      className="w-full px-2 flex flex-col gap-4 pb-6"
      data-testid="keyboard"
    >
      {lettersIdsGroups.map((lettersIds, keyboardRow) => (
        <div className="flex gap-2" key={keyboardRow}>
          {lettersIds.map((letterId) => (
            <KeyboardButton
              key={letterId}
              letterId={letterId}
              handleClick={() => handleClick({ letterId })}
            />
          ))}
          {getKeyboardActionButtonByRow(keyboardRow)}
        </div>
      ))}
    </div>
  )
}

export default Keyboard
