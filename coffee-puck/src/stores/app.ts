import { notification } from '@/data/types'
import { createUUID } from '@/services/utils';
import { defineStore } from 'pinia'

export const defaultNotificationOptions = {
  notificationType: "info",
  title: "Info Notification",
  message: "Ooops! A message was not provided",
  autoClose: true,
  duration: 5,
};

export type AppState = {
  notifications: notification[],
}

export const useAppStore = defineStore('useAppStore', {
  state: (): AppState => {
    return {
      notifications: [] as notification[]
    };
  },
  actions: {
    addNotification(notification: notification) {
      const defaultNotification = Object.assign({ ...defaultNotificationOptions }, notification);
      this.notifications.push({ id: createUUID(), ...defaultNotification });
    },
    removeNotification(id: string){
        const index = this.notifications.findIndex((item: notification) => {
          return item.id ? item.id === id : false;
        });

        if (index !== -1) this.notifications.splice(index, 1);
    }
  }
});
