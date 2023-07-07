import { render } from '@testing-library/react'
import Statistics from '.'

//Just for coverage
describe('<Statistics />', () => {
  it('Should render', () => {
    render(<Statistics />)
  })
})
