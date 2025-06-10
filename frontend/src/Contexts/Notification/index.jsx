import React, { createContext, useContext, useState, useCallback } from 'react';
import { Notification } from '../../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notificationProps, setNotificationProps] = useState(null);

  const showNotification = useCallback(({ title, src, descript, duration }) => {
    setNotificationProps({
      title,
      src,
      descript,
      duration,
      onClose: () => setNotificationProps(null)
    });
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notificationProps && <Notification {...notificationProps} />}
    </NotificationContext.Provider>
  );
};
