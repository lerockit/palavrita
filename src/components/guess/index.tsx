import React, { ReactNode } from 'react'
import { WORD_SIZE } from '../../constants'
import GuessLetter from '../guess-letter'
import { GuessProps } from './interface'

const GuessContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="font-bold text-2xl flex justify-between w-full">
    {children}
  </div>
)

const Guess: React.FC<GuessProps> = ({ guess }) => {
  if (!guess)
    return (
      <GuessContainer>
        {Array.from(Array(WORD_SIZE), (_, letterIndex) => (
          <GuessLetter key={letterIndex} letterIndex={letterIndex} />
        ))}
      </GuessContainer>
    )

  const { letters, isCurrent } = guess

  return (
    <GuessContainer>
      {Array.from(Array(WORD_SIZE), (_, letterIndex) => (
        <GuessLetter
          key={letterIndex}
          isCurrent={isCurrent}
          letterStatus={letters[letterIndex]?.status}
          letterIndex={letterIndex}
        >
          <span className="drop-shadow">{letters[letterIndex]?.id}</span>
        </GuessLetter>
      ))}
    </GuessContainer>
  )
}

export default Guess
