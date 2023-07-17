import { render } from '@testing-library/react'
import { toast } from 'react-hot-toast'
import useNotification from '.'
import { NotificationConfigs } from './interface'

const toastCustomMock = jest.fn()

jest.mock('react-hot-toast', () => {
  return {
    toast: {
      custom: jest.fn(),
    },
  }
})
describe('useNotification', () => {
  afterEach(() => jest.clearAllMocks())

  it('Should call toast from react-hot-toast with correct params when notify is called', () => {
    ;(toast.custom as jest.Mock).mockImplementation(toastCustomMock)
    const MockElement = () => <></>
    const mockConfig: NotificationConfigs = {
      duration: 1000,
      position: 'bottom-center',
    }
    const { notify } = useNotification()
    notify(MockElement, mockConfig)

    expect(toastCustomMock).toHaveBeenCalledTimes(1)
    expect(toastCustomMock).toHaveBeenCalledWith(expect.any(Function), {
      duration: 1000,
      position: 'bottom-center',
    })
  })

  it('Should render notification container with correct classes when visible is false', () => {
    ;(toast.custom as jest.Mock).mockImplementation(toastCustomMock)
    const toastCustom = toast.custom as jest.Mock
    const MockElement = () => <></>

    const { notify } = useNotification()
    notify(MockElement)

    const notificationContainer = toastCustom.mock.calls[0][0]
    const { getByTestId } = render(notificationContainer({ visible: false }))

    expect(getByTestId('notification-container')).toHaveClass(
      'animate-fade-out'
    )
  })

  it('Should render notification container with correct classes when visible is true', () => {
    ;(toast.custom as jest.Mock).mockImplementation(toastCustomMock)
    const toastCustom = toast.custom as jest.Mock
    const MockElement = () => <></>

    const { notify } = useNotification()
    notify(MockElement)

    const notificationContainer = toastCustom.mock.calls[0][0]
    const { getByTestId } = render(notificationContainer({ visible: true }))

    expect(getByTestId('notification-container')).toHaveClass('animate-fade-in')
  })
})
