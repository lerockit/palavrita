import { render } from '@testing-library/react'
import Home from '.'
import RouteContainer from '../../components/route-container'

jest.mock('../../components/route-container')

//Just for coverage
describe('<Home />', () => {
  it('Should render', () => {
    ;(RouteContainer as jest.Mock).mockReturnValue(<></>)
    render(<Home />)
  })
})
