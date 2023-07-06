import { GuessStatisticProps } from './interface'

const GuessStatistic: React.FC<GuessStatisticProps> = ({
  guessAmount,
  guessIndex,
  totalGamesAmount,
}) => {
  const getWidth = () => {
    if (!totalGamesAmount) return '0rem'
    return `${(guessAmount / totalGamesAmount) * 100}%`
  }

  return (
    <div className="flex items-center">
      <span className="pr-2 w-6 drop-shadow font-bold text-xl">
        {guessIndex}
      </span>
      <div
        className="bg-slate-50 rounded-sm shadow h-3"
        style={{ width: `calc(${getWidth()} + 1rem)` }}
        data-testid="guess-statistic-bar"
      />
      <span className="pl-2 font-light text-xs">{guessAmount}</span>
    </div>
  )
}

export default GuessStatistic
