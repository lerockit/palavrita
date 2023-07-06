import { render } from '@testing-library/react'
import PageTemplate from '.'

//Just for coverage
describe('<PageTemplate />', () => {
  it('Should render with correct children', () => {
    const mockChildrenText = 'MOCK'
    const { getByText } = render(
      <PageTemplate>{mockChildrenText}</PageTemplate>
    )
    expect(getByText(mockChildrenText)).toBeInTheDocument()
  })
})
