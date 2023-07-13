import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import Button from '.'

describe('<Button />', () => {
  it('Should render text, icon and call onClick function when click', () => {
    const onClickMock = jest.fn()
    const textMock = 'TEXT-MOCK'
    const IconMock = <>IconMock</>

    const { getByText, getByRole } = render(
      <Button onClick={() => onClickMock()} text={textMock} icon={IconMock} />
    )

    const buttonElement = getByRole('button')
    act(() => buttonElement.click())

    expect(getByText(textMock)).toBeInTheDocument()
    expect(getByText('IconMock')).toBeInTheDocument()
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
