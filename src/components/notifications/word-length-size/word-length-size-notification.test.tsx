import { render } from '@testing-library/react'
import WordLengthSizeNotification from '.'

//Just for coverage
describe('<WordLengthSizeNotification />', () => {
  it('Should render', () => {
    render(<WordLengthSizeNotification />)
  })
})
