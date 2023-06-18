import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/global'

const Guesses: React.FC = () => {
  const { previousGuesses, currentGuess } = useContext(GlobalContext)
  const allGuesses = [...previousGuesses, { ...currentGuess, isCurrent: true }]
  return (
    <div className="pb-6 w-72 mx-auto flex flex-col gap-4">
      {/* {Array.from(Array(GUESSES_AMOUNT), (_, guessIndex) => (
        <Guess guess={allGuesses[guessIndex]} key={guessIndex} />
      ))} */}
    </div>
  )
}

export default Guesses
