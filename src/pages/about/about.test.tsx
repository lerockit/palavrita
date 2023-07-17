import { render } from '@testing-library/react'
import About from '.'

jest.mock('../../images/about_picture.png', () => ({
  default: '',
}))

//Just for coverage
describe('<About />', () => {
  it('Should render', () => {
    render(<About />)
  })
})
