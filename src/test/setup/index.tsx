import matchers from '@testing-library/jest-dom/matchers'
import {
  RenderOptions,
  RenderResult,
  cleanup,
  render,
} from '@testing-library/react'
import { ReactElement } from 'react'
import { afterEach, expect } from 'vitest'
import { GlobalContext, globalContextDefault } from '../../contexts/global'
import { GlobalContextInterface } from '../../contexts/global/interface'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

export const renderWithGlobalContext: (
  ui: ReactElement,
  context: Partial<GlobalContextInterface>,
  renderOptions?: RenderOptions
) => RenderResult = (ui, context, renderOptions) => {
  return render(
    <GlobalContext.Provider value={{ ...globalContextDefault, ...context }}>
      {ui}
    </GlobalContext.Provider>,
    renderOptions
  )
}
