import { render } from '@testing-library/react'
import NotAllowedWordNotification from '.'

//Just for coverage
describe('<NotAllowedWordNotification />', () => {
  it('Should render', () => {
    render(<NotAllowedWordNotification />)
  })
})
