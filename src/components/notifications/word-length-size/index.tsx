import { WORD_SIZE } from '../../../constants'

const WordLengthSizeNotification: React.FC = () => {
  return (
    <span className="drop-shadow">
      a palavra deve ter no minimo {WORD_SIZE} letras
    </span>
  )
}

export default WordLengthSizeNotification
