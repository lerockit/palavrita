import { render } from '@testing-library/react'
import GuessStatistic from '.'

describe('<GuessStatistic />', () => {
  it('Should have correct width when totalGamesAmount is 0', () => {
    const totalGamesAmount = 0
    const { getByTestId } = render(
      <GuessStatistic
        totalGamesAmount={totalGamesAmount}
        guessIndex={1}
        guessAmount={1}
      />
    )

    expect(getByTestId('guess-statistic-bar')).toHaveStyle(
      'width: calc(0rem + 1rem)'
    )
  })

  it('Should have correct width when totalGamesAmount is not 0', () => {
    const totalGamesAmount = 1
    const { getByTestId } = render(
      <GuessStatistic
        totalGamesAmount={totalGamesAmount}
        guessIndex={1}
        guessAmount={1}
      />
    )

    expect(getByTestId('guess-statistic-bar')).toHaveStyle(
      'width: calc(100% + 1rem)'
    )
  })
})
