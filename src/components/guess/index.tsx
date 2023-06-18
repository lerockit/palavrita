import React, { ReactNode } from 'react'
import { WORD_SIZE } from '../../constants'
import { GuessWithStatus } from '../../contexts/global/interface'
import { GuessProps } from './interface'

const GuessContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="font-bold text-xl flex justify-between w-full">
    {children}
  </div>
)

const GuessLetterContainer: React.FC<{
  children?: ReactNode
  isCurrent?: boolean
}> = ({ children }) => (
  <div className="border-2 border-slate-50 rounded-sm w-10 h-10 flex justify-center items-center">
    {children}
  </div>
)

const Guess: React.FC<GuessProps> = ({ guess }) => {
  if (!guess)
    return (
      <GuessContainer>
        {Array.from(Array(WORD_SIZE), (_, letterIndex) => (
          <GuessLetterContainer key={letterIndex} />
        ))}
      </GuessContainer>
    )

  const { letters, isCurrent } = guess as GuessWithStatus

  return (
    <GuessContainer>
      {Array.from(Array(WORD_SIZE), (_, letterIndex) => (
        <GuessLetterContainer key={letterIndex} isCurrent={isCurrent}>
          <span>{letters[letterIndex].id}</span>
        </GuessLetterContainer>
      ))}
    </GuessContainer>
  )
}

export default Guess
