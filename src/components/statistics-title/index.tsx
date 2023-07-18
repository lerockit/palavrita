import React, { useContext } from 'react'
import { GlobalContext } from '../../contexts/global'
import { Guess as GuessType, Letter } from '../../contexts/global/interface'
import useGameStatusStorage from '../../hooks/useGameStatusStorage'
import Guess from '../guess'
import { AllowedLetterId } from '../keyboard/interfaces'
import ShareButton from '../share-button'
import Timer from '../timer'
import Title from '../title'

const wonTitle = (
  <Title>
    <div className="flex flex-col gap">
      <span>Parabéns</span>
      <span>
        Você <span className="text-emerald-300">Ganhou!</span>
      </span>
    </div>
  </Title>
)

const lostTitle = (
  <Title>
    <div className="flex flex-col gap">
      <span>
        Que <span className="text-amber-300">pena</span>
      </span>
      <span>Fica pra próxima</span>
    </div>
  </Title>
)

const StatisticsTitle: React.FC = () => {
  const { gameFinishStatus } = useContext(GlobalContext)
  const { dailyWord } = useGameStatusStorage().getPayload()
  const hasWon = gameFinishStatus === 'WON'

  const dailyWordLetters = (
    dailyWord.split('') as AllowedLetterId[]
  ).map<Letter>((dailyWordLetter: AllowedLetterId) => ({
    id: dailyWordLetter,
    status: hasWon ? 'CORRECT' : null,
  }))

  const dailyWordGuess: GuessType = {
    word: dailyWord,
    letters: dailyWordLetters,
  }

  const StatusTitle = () => (hasWon ? wonTitle : lostTitle)

  return (
    <>
      {gameFinishStatus ? (
        <div className="flex flex-col gap-6 items-center">
          <StatusTitle />
          <div className="w-72">
            <Guess guess={dailyWordGuess} />
          </div>
          <Timer />
          <ShareButton />
        </div>
      ) : (
        <Title>Estatísticas</Title>
      )}
    </>
  )
}

export default StatisticsTitle
