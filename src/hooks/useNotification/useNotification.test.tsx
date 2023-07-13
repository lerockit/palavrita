import { toast } from 'react-hot-toast'
import useNotification from '.'
import { NotificationConfigs } from './interface'

const toastMock = jest.fn()

jest.mock('react-hot-toast', () => {
  return {
    toast: jest.fn(),
  }
})

describe('useNotification', () => {
  it('Should call toast from react-hot-toast with correct params when notify is called', () => {
    ;(toast as unknown as jest.Mock).mockImplementation(toastMock)
    const MockElement = () => <></>
    const mockConfig: NotificationConfigs = {
      duration: 1000,
      position: 'bottom-center',
    }
    const { notify } = useNotification()
    notify(MockElement, mockConfig)

    expect(toastMock).toHaveBeenCalledTimes(1)
    expect(toastMock).toHaveBeenCalledWith(expect.any(Function), {
      className: `bg-emerald-600 border-emerald-200
        rounded-lg text-slate-50 shadow px-4 py-2 text-xs font-medium border-2 uppercase tracking-wider text-center`,
      duration: 1000,
      position: 'bottom-center',
    })
  })
})
