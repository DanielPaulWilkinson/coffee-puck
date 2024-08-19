import { ref } from "vue";

function createUUID() {
  let dt = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

export type Notification = {
  id: string;
  notificationType: string;
  title: string;
  message: string;
  autoClose: boolean;
  duration: number;
}

export type CreateNotification = {
  (options: {
    type?: string;
    title?: string;
    message?: string;
    autoClose?: boolean;
    duration?: number;
  }): void;
};

const defaultNotificationOptions = {
  notificationType: "info",
  title: "Info Notification",
  message: "Ooops! A message was not provided",
  autoClose: true,
  duration: 5,
};

export default function useNotifications() {
  const notifications = ref<Notification[]>([]);

  const createNotification: CreateNotification = (options) => {
    const _options = Object.assign({ ...defaultNotificationOptions }, options);

    notifications.value.push(
      ...[
        {
          id: createUUID(),
          ..._options,
        },
      ]
    );
  };

  const createErrorNotification: CreateNotification = (options) => {
    createNotification({
      type: "error",
      title: "Yikes. Something went wrong.",
      duration: 8,
      ...options,
    });
  };

  const createSuccessNotification: CreateNotification = (options) => {
    createNotification({ type: "success", title: "Success!", ...options });
  };

  const createWarningNotification: CreateNotification = (options) => {
    createNotification({
      type: "warning",
      title: "Something to lookout for.",
      duration: 8,
      ...options,
    });
  };

  const removeNotifications = (id: string) => {
    const index = notifications.value.findIndex((item) => item.id === id);
    if (index !== -1) notifications.value.splice(index, 1);
  };

  const stopBodyOverflow = () => {
    document && document.body.classList.add(...["hide-overflow"]);
  };

  const allowBodyOverflow = () => {
    document && document.body.classList.remove(...["hide-overflow"]);
  };

  return {
    notifications,
    createNotification,
    createSuccessNotification,
    createErrorNotification,
    createWarningNotification,
    removeNotifications,
    stopBodyOverflow,
    allowBodyOverflow,
  };
}