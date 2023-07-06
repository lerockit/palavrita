import React from 'react'
import Footer from '../../components/footer'
import GuessStatistic from '../../components/guess-statistic'
import RouteContainer from '../../components/route-container'
import StatisticsTitle from '../../components/statistics-title'
import { useGameStatusStorage } from '../../hooks/useGameStatusStorage'

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
    totalGamesAmount,
    winPercentage,
    winStreak,
    bestStreak,
    guessStatistics,
    lossAmount,
  } = useGameStatusStorage().getPayload()
  return (
    <RouteContainer key="STATISTICS">
      <StatisticsTitle />
      <div
        className="flex flex-col items-center w-full"
        data-testid="statistics-page"
      >
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
    </RouteContainer>
  )
}

export default Statistics
