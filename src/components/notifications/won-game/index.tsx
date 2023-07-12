import React from 'react'

const wonGameWords: Record<number, string> = {
  1: 'Divino!',
  2: 'Fantástico!',
  3: 'Ótimo!',
  4: 'Muito Bom!',
  5: 'Boa!',
}

const WonGameNotification: React.FC<{ guessIndex?: number }> = ({
  guessIndex = 1,
}) => {
  return (
    <span className="drop-shadow">{wonGameWords[guessIndex] ?? 'Ufa!'}</span>
  )
}

export default WonGameNotification
