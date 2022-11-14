import { createContext, ReactNode, useState } from "react";
import { Notification, NotificationProps } from "./Notification";

export type CreateNotificationProps = Omit<NotificationProps, "id" | "onClose">;

interface NotificationsContextProps {
  open: (notification: CreateNotificationProps) => string;
  close: (id: string) => void;
}

export const NotificationsContext = createContext<NotificationsContextProps>({
  open: (_notification: CreateNotificationProps) => "",
  close: (_id: string) => {},
});

interface NotificationsProviderProps {
  children: ReactNode;
}

const makeHash = () => Math.random().toString(36).slice(2, 10);

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const open = (notification: CreateNotificationProps) => {
    const id = makeHash();
    setNotifications((notifications) => [
      { ...notification, id },
      ...notifications,
    ]);
    return id;
  };
  const close = (id: string) => {
    setNotifications((notifications) =>
      notifications.filter((item) => item.id !== id)
    );
  };

  const value = { open, close };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <div className="notifications">
        {notifications.map((item) => (
          <Notification
            key={item.id}
            {...item}
            onClose={() => close(item.id as string)}
          />
        ))}
      </div>
    </NotificationsContext.Provider>
  );
};
