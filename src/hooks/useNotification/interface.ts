export interface UseNotificationHook<T> {
  notify: (content: React.FC<T>, config?: NotificationConfigs) => void
}

export interface NotificationConfigs {
  duration?: number
  theme?: NotificationTheme
  contentProps?: Record<any, any>
  position?: NotificationPositions
}

export type NotificationTheme = 'ERROR' | 'WARNING' | 'SUCCESS'
export type NotificationPositions = 'bottom-center' | 'top-center'
