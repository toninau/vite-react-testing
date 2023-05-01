import React, { createContext, useContext, useState } from 'react';
import type { Notification } from './types';

const NotificationContext = createContext<
  [Notification[], React.Dispatch<React.SetStateAction<Notification[]>>]
>([[], () => []]);

export const useNotifications = () => {
  const [notifications, setNotifications] = useContext(NotificationContext);

  const addNotification = (notification: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.concat(notification)
    );
  };

  const removeNotification = (id: Notification['id']) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

type NotificationProviderProps = {
  children: React.ReactNode;
};

function NotificationProvider({ children }: NotificationProviderProps) {
  const state = useState<Notification[]>([]);

  return (
    <NotificationContext.Provider value={state}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
