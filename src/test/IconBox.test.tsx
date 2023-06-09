import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import IconBox from '../components/icon-box'

describe('Should render IconBox correctly', () => {
  const iconMock: ReactNode = <div data-testid="icon-mock"></div>

  it('Shoul render with default classes', () => {
    render(<IconBox iconElement={iconMock} data-testid="icon-box" />)

    const iconBoxElement = screen.getByTestId('icon-box')
    const defaultClasses = 'w-3.5 h-3.5 text-slate-50'

    expect(iconBoxElement).toHaveClass(defaultClasses)
  })
})
