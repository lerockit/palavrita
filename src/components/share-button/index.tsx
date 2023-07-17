import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import {
  EMOGI_LETTER_STATUS_MAPPER,
  GUESSES_AMOUNT,
  LINKS,
} from '../../constants'
import { GlobalContext } from '../../contexts/global'
import useDate from '../../hooks/useDate'
import useNotification from '../../hooks/useNotification'
import Button from '../button'
import ShareIcon from '../icons/share-icon'
import CopyToClipBoardNotification from '../notifications/copy-to-clipboard'

const ShareButton: React.FC = () => {
  const { previousGuesses: guesses, gameFinishStatus } =
    useContext(GlobalContext)

  const { notify } = useNotification()
  const { getTodayInBRFormat } = useDate()

  const guessesAsEmoji = guesses.reduce((previousGuessEmojis, currentGuess) => {
    const lettersAsEmoji = currentGuess.letters.reduce(
      (previousLetterEmoji, currentLetter) => {
        if (!currentLetter.status)
          return `${previousLetterEmoji} ${EMOGI_LETTER_STATUS_MAPPER.NULL}`
        return `${previousLetterEmoji} ${
          EMOGI_LETTER_STATUS_MAPPER[currentLetter.status]
        }`
      },
      ''
    )

    return `${previousGuessEmojis}\n${lettersAsEmoji}`
  }, '')

  const totalGuessAmount = gameFinishStatus === 'WON' ? guesses.length : 'X'

  const shareText = `Minha pontuação do Palavrita de hoje - ${getTodayInBRFormat()} (${totalGuessAmount}/${GUESSES_AMOUNT}) \n@palavrita \n${guessesAsEmoji} \n \nJogue também em ${
    LINKS.PALAVRITA
  }`

  const handleClick = () => {
    if (!isMobile) {
      notify(CopyToClipBoardNotification, { duration: 1500 })
      return navigator.clipboard.writeText(shareText)
    }
    navigator.share({ text: shareText })
  }

  return <Button onClick={handleClick} text="Compartilhar" icon={ShareIcon} />
}

export default ShareButton
