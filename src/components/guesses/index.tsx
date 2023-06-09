import React, { useContext } from 'react'
import { GUESSES_AMOUNT } from '../../constants'
import { GlobalContext } from '../../contexts/global'
import Guess from '../guess'

const Guesses: React.FC = () => {
  const { previousGuesses, currentGuess } = useContext(GlobalContext)
  const allGuesses = [...previousGuesses, { ...currentGuess, isCurrent: true }]
  return (
    <div className="pb-6 w-72 flex flex-col gap-4">
      {Array.from(Array(GUESSES_AMOUNT), (_, guessIndex) => (
        <Guess guess={allGuesses[guessIndex]} key={guessIndex} />
      ))}
    </div>
  )
}

export default Guesses
