import {
  useNotificationsStore,
  type NotificationsType,
} from '~/stores/ui/notifications/store'

const useNotificationBase = (opt: {
  title: string
  description: string
  type: NotificationsType
}) => {
  const store = useNotificationsStore()
  store.addNotifications({
    description: opt.description,
    title: opt.title,
    type: opt.type,
    open: true,
    duration: 3000,
    id: Date.now(),
  })
}

export const useNotificationSuccess = (title: string, description: string) => {
  useNotificationBase({
    title: title,
    description: description,
    type: 'success',
  })
}

export const useNotificationError = (title: string, description: string) => {
  useNotificationBase({
    title: title,
    description: description,
    type: 'error',
  })
}

export const useNotificationWarning = (title: string, description: string) => {
  useNotificationBase({
    title: title,
    description: description,
    type: 'warning',
  })
}
