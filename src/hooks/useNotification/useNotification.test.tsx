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
    const { custom } = toast
    let customCallback
    ;(custom as unknown as jest.Mock).mockImplementation(
      toastCustomMock.mockImplementation((callback) => {
        customCallback = callback
      })
    )
    const MockElement = () => <></>
    const mockConfig: NotificationConfigs = {
      duration: 1000,
      position: 'bottom-center',
    }
    const { notify } = useNotification()
    notify(MockElement, mockConfig)

    expect(toastCustomMock).toHaveBeenCalledTimes(1)
    expect(toastCustomMock).toHaveBeenCalledWith(customCallback, {
      duration: 1000,
      position: 'bottom-center',
    })
  })
})
