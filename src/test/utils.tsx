import {
  RenderOptions,
  RenderResult,
  act,
  render,
} from '@testing-library/react'
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

export const asyncTimeout = async (timeout: number) =>
  await new Promise((r) => setTimeout(r, timeout))

export const waitForAnimation = async (
  callBack: () => void,
  animationDuration: number
) =>
  await act(async () => {
    await asyncTimeout(animationDuration + 100)
    callBack()
  })

export const mockLocalStorage = () => {
  const setItemMock = jest.fn()
  const getItemMock = jest.fn()

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock
    Storage.prototype.getItem = getItemMock
  })

  afterEach(() => {
    setItemMock.mockRestore()
    getItemMock.mockRestore()
  })

  return { setItemMock, getItemMock }
}

export const mockNavigator = () => {
  const writeTextMock = jest.fn()
  const shareMock = jest.fn()

  beforeEach(() => {
    window.navigator.share = shareMock
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    })
  })

  afterEach(() => {
    writeTextMock.mockRestore()
    shareMock.mockRestore()
  })

  return { writeTextMock, shareMock }
}
