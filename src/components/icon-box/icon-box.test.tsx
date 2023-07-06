import { render } from '@testing-library/react'
import IconBox from '.'

describe('<IconBox />', () => {
  const fakeIconElement = <></>

  it('Should have drop-shadow class when hasShadow is true', () => {
    const hasShadow = true
    const testId = 'icon-box'
    const { getByTestId } = render(
      <IconBox
        iconElement={fakeIconElement}
        hasShadow={hasShadow}
        data-testid={testId}
      />
    )

    expect(getByTestId(testId)).toHaveClass('drop-shadow')
  })

  it('Should not have drop-shadow class when hasShadow is false', () => {
    const hasShadow = false
    const testId = 'icon-box'
    const { getByTestId } = render(
      <IconBox
        iconElement={fakeIconElement}
        hasShadow={hasShadow}
        data-testid={testId}
      />
    )

    expect(getByTestId(testId)).not.toHaveClass('drop-shadow')
  })
})
