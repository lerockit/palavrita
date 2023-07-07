import { Variants, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'

import {
  GUESS_ANIMATION_DELAY,
  GUESS_ANIMATION_DURATION_IN_MILISECONDS,
  GUESS_ANIMATION_DURATION_IN_SECONDS,
} from '../../constants'
import { GlobalContext } from '../../contexts/global'
import { hex2rgba } from '../../utils/hex-transform'
import theme from '../../utils/theme'
import { GuessLetterProps } from './interface'

const GuessLetter: React.FC<GuessLetterProps> = ({
  children,
  isCurrent,
  letterStatus,
  letterIndex,
}) => {
  const { currentGuess, hasError, gameFinishStatus } = useContext(GlobalContext)
  const isSelected =
    letterIndex === currentGuess.letters.length &&
    isCurrent &&
    !gameFinishStatus

  const [isFirstAnimationLoaded, setIsFirstAnimationLoaded] =
    useState<boolean>(false)

  useEffect(() => {
    setTimeout(
      () => setIsFirstAnimationLoaded(true),
      GUESS_ANIMATION_DURATION_IN_MILISECONDS
    )
  }, [])

  const getStatusVariant = (color: string) => {
    return {
      transition: {
        delay: isFirstAnimationLoaded ? letterIndex * GUESS_ANIMATION_DELAY : 0,
        duration: GUESS_ANIMATION_DURATION_IN_SECONDS,
      },
      backgroundColor: [hex2rgba(color, 0), hex2rgba(color)],
    }
  }

  const guessLetterVariants: Variants = {
    selected: {
      borderBottomWidth: '6px',
      transition: {
        duration: 0.1,
      },
    },
    default: {
      borderBottomWidth: theme.borderWidth[2],
    },
    error: {
      borderColor: hex2rgba(theme.backgroundColor.pink[600]),
    },
    CORRECT: getStatusVariant(theme.backgroundColor.emerald[500]),
    DISPLACED: getStatusVariant(theme.backgroundColor.amber[500]),
    INCORRECT: getStatusVariant(theme.backgroundColor.pink[600]),
  }

  const getAnimate = () => {
    if (isSelected) return 'selected'
    if (hasError && isCurrent) return 'error'
    return letterStatus ?? 'default'
  }

  return (
    <motion.div
      className="rounded-sm flex justify-center items-center w-12 h-12 shadow border-slate-50 border-2"
      variants={guessLetterVariants}
      animate={getAnimate()}
      data-testid="guess-letter"
    >
      {children}
    </motion.div>
  )
}

export default GuessLetter
