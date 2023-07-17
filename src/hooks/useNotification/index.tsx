import { toast } from 'react-hot-toast'
import { NotificationConfigs, NotificationTheme } from './interface'

const notificationThemeClasses: Record<NotificationTheme, string> = {
  ERROR: 'bg-pink-500 border-pink-200',
  SUCCESS: 'bg-emerald-500 border-emerald-200',
  WARNING: 'bg-amber-500 border-amber-200',
}

const useNotification = () => {
  const notify = (
    ContentElement: React.FC,
    configs: NotificationConfigs = {}
  ) => {
    const { duration, theme, contentProps, position }: NotificationConfigs = {
      duration: 3000,
      theme: 'SUCCESS',
      contentProps: {},
      position: 'top-center',
      ...configs,
    }

    toast.custom(
      (t) => {
        return (
          <div
            className={`
              ${notificationThemeClasses[theme]}
              ${t.visible ? 'animate-fade-in' : 'animate-fade-out'}
              rounded text-slate-50 shadow px-4 py-2 text-xs font-medium border-2 uppercase tracking-wider text-center
            `}
            data-testid="notification-container"
          >
            <ContentElement {...contentProps} />
          </div>
        )
      },
      { duration, position }
    )
  }

  return {
    notify,
  }
}

export default useNotification
