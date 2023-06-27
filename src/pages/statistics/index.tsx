import React, { useContext } from 'react'
import Footer from '../../components/footer'
import Guess from '../../components/guess'
import GuessStatistic from '../../components/guess-statistic'
import { AllowedLetterId } from '../../components/keyboard/interfaces'
import Timer from '../../components/timer'
import Title from '../../components/title'
import { GlobalContext } from '../../contexts/global'
import { Guess as GuessType, Letter } from '../../contexts/global/interface'
import { useGameStatusStorage } from '../../hooks/useGameStatusStorage'

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

const StatisticContainer: React.FC<{
  statistic: string
  description: string
}> = ({ statistic, description }) => {
  return (
    <div className="flex flex-col items-center text-center w-1/4 px-4">
      <span className="font-bold text-2xl">{statistic}</span>
      <div className="grow font-light text-xs">{description}</div>
    </div>
  )
}

const Statistics: React.FC = () => {
  const {
    dailyWord,
    totalGamesAmount,
    winPercentage,
    winStreak,
    bestStreak,
    guessStatistics,
    lossAmount,
  } = useGameStatusStorage().getPayload()
  const { gameFinishStatus } = useContext(GlobalContext)
  const hasWon = gameFinishStatus === 'WON'

  const dailyWordLetters = (
    dailyWord.split('') as AllowedLetterId[]
  ).map<Letter>((dailyWordLetter: AllowedLetterId) => ({
    id: dailyWordLetter,
    status: hasWon ? 'CORRECT' : 'INCORRECT',
  }))

  const dailyWordGuess: GuessType = {
    word: dailyWord,
    letters: dailyWordLetters,
  }

  const StatusTitle = () => (hasWon ? wonTitle : lostTitle)

  return (
    <>
      <div className="flex flex-col items-center w-full">
        {gameFinishStatus ? (
          <div className="flex flex-col gap-6 items-center">
            <StatusTitle />
            <div className="w-72">
              <Guess guess={dailyWordGuess} />
            </div>
            <Timer />
          </div>
        ) : (
          <Title>Estatísticas</Title>
        )}
        <div className="py-8 flex drop-shadow">
          <StatisticContainer
            statistic={String(totalGamesAmount)}
            description="jogos"
          />
          <StatisticContainer
            statistic={`${winPercentage}%`}
            description="vitórias"
          />
          <StatisticContainer
            statistic={String(winStreak)}
            description="sequência de vitórias"
          />
          <StatisticContainer
            statistic={String(bestStreak)}
            description="melhor sequência"
          />
        </div>
        <div className="flex flex-col gap-2 w-full px-8 pb-8">
          <span className="font-light drop-shadow text-xl pb-2 text-center">
            distribuição de tentativas
          </span>
          {guessStatistics.map((guessStatisticAmount, guessIndex) => (
            <GuessStatistic
              guessAmount={guessStatisticAmount}
              guessIndex={guessIndex + 1}
              totalGamesAmount={totalGamesAmount}
              key={guessIndex}
            />
          ))}
          <GuessStatistic
            guessAmount={lossAmount}
            guessIndex="X"
            totalGamesAmount={totalGamesAmount}
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Statistics
