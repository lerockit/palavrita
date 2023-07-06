import { render } from '@testing-library/react'
import RouteContainer from '.'

//Just for coverage
describe('<RouteContainer />', () => {
  it('Should render with correct children', () => {
    const mockChildrenText = 'MOCK'
    const mockKey: any = 'mockKey'
    const { getByText } = render(
      <RouteContainer routeKey={mockKey}>{mockChildrenText}</RouteContainer>
    )
    expect(getByText(mockChildrenText)).toBeInTheDocument()
  })
})
