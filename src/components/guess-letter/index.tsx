import { useContext } from 'react'
import { GlobalContext } from '../../contexts/global'
import { GuessLetterProps } from './interface'

const GuessLetter: React.FC<GuessLetterProps> = ({
  children,
  isCurrent,
  letterStatus,
  letterIndex,
}) => {
  const { currentGuess, hasError, gameFinishStatus } = useContext(GlobalContext)
  const isSelected = letterIndex === currentGuess.letters.length

  const getDisplacedClasses = () => {
    if (isCurrent) return ''
    return letterStatus === 'DISPLACED' ? 'bg-amber-500' : ''
  }
  const getCorrectClasses = () => {
    if (isCurrent) return ''
    return letterStatus === 'CORRECT' ? 'bg-emerald-500' : ''
  }
  const getBorderClasses = () => {
    const defaultBorderclass = 'border-slate-50 border-2'
    if (!isCurrent || !!gameFinishStatus) return defaultBorderclass
    if (hasError) return 'border-pink-600 border-2'
    if (isSelected) return `${defaultBorderclass} border-[3px] border-b-[6px]`
    return defaultBorderclass
  }

  return (
    <div
      className={`
        rounded-sm flex justify-center items-center w-12 h-12 shadow
        ${getDisplacedClasses()}
        ${getCorrectClasses()}
        ${getBorderClasses()}
      `}
      data-testid="guess-letter"
    >
      {children}
    </div>
  )
}

export default GuessLetter
