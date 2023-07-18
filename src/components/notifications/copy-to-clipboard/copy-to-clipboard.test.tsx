import { render } from '@testing-library/react'
import CopyToClipboard from '.'

//Just for coverage
describe('<CopyToClipboard />', () => {
  it('Should render', () => {
    render(<CopyToClipboard />)
  })
})
