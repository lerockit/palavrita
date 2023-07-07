import { render } from '@testing-library/react'
import About from '.'

//Just for coverage
describe('<About />', () => {
  it('Should render', () => {
    render(<About />)
  })
})
