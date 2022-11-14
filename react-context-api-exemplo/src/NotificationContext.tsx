import { createContext, ReactNode, useState } from "react";
import { Notification, NotificationProps } from "./Notification";

type AddNotificationProps = Omit<NotificationProps, "id">;

interface NotificationContextProps {
  add: (notification: AddNotificationProps) => string;
  remove: (id: string) => void;
}

interface NotificationPropsWithId extends NotificationProps {
  id: string;
}

export const NotificationContext = createContext<NotificationContextProps>({
  add: (_notification: AddNotificationProps) => "",
  remove: (_id: string) => {},
});

interface NotificationProviderProps {
  children: ReactNode;
}

const makeHash = () => Math.random().toString(36).slice(2, 10);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationPropsWithId[]>(
    []
  );

  const add = (notification: AddNotificationProps) => {
    const id = makeHash();
    setNotifications((notifications) => [
      { id, ...notification },
      ...notifications,
    ]);
    return id;
  };

  const remove = (id: string) => {
    setNotifications((notifications) =>
      notifications.filter((item) => item.id !== id)
    );
  };

  const value = {
    add,
    remove,
  };
  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="notifications">
        {notifications.map((item) => (
          <Notification
            key={item.id}
            {...item}
            onClose={() => remove(item.id)}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
