import StatisticsTitle from '.'
import { renderWithGlobalContext } from '../../test/utils'

describe('<StatisticsTitle />', () => {
  it('Should render correctly title when gameFinishStatus is null', () => {
    const { getByText } = renderWithGlobalContext(<StatisticsTitle />, {
      gameFinishStatus: null,
    })
    const expectText = 'Estatísticas'
    expect(getByText(expectText)).toBeInTheDocument()
  })

  it('Should render correctly title when gameFinishStatus is WON', () => {
    const { getByText } = renderWithGlobalContext(<StatisticsTitle />, {
      gameFinishStatus: 'WON',
    })
    const expectText = 'Parabéns'
    expect(getByText(expectText)).toBeInTheDocument()
  })

  it('Should render correctly title when gameFinishStatus is LOST', () => {
    const { getByText } = renderWithGlobalContext(<StatisticsTitle />, {
      gameFinishStatus: 'LOST',
    })
    const expectText = 'Fica pra próxima'
    expect(getByText(expectText)).toBeInTheDocument()
  })
})
