import { render } from '@testing-library/react'
import Help from '.'

//Just for coverage
describe('<Help />', () => {
  it('Should render', () => {
    render(<Help />)
  })
})
