import { RenderOptions, RenderResult, render } from '@testing-library/react'
import { ReactElement } from 'react'
import { GlobalContext, globalContextDefault } from '../contexts/global'
import { GlobalContextInterface } from '../contexts/global/interface'
import { RouterContext, routerContextDefault } from '../contexts/router'
import { RouterContextInterface } from '../contexts/router/interface'

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

export const renderWithRouterContext: (
  ui: ReactElement,
  context: Partial<RouterContextInterface>,
  renderOptions?: RenderOptions
) => RenderResult = (ui, context, renderOptions) => {
  return render(
    <RouterContext.Provider value={{ ...routerContextDefault, ...context }}>
      {ui}
    </RouterContext.Provider>,
    renderOptions
  )
}
