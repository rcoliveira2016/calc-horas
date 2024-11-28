export const useNotificationsStore = defineStore('ui/notifications', {
  state: (): NotificationsState => ({
    notificationsItens: [],
  }),
  actions: {
    addNotifications(notifications: NotificationsItemState) {
      this.notificationsItens.push(notifications)
    },
    removeNotifications(id: number) {
      this.notificationsItens = this.notificationsItens.filter(
        (item) => item.id !== id,
      )
    },
  },
})

export type NotificationsType = 'error' | 'warning' | 'success' | 'info'
export type NotificationsState = {
  notificationsItens: NotificationsItemState[]
}
export type NotificationsItemState = {
  id: number
  title: string
  description: string
  type: NotificationsType
  duration: number
  open: boolean
}
