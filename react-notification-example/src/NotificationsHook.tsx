import { useContext } from "react";
import { NotificationType } from "./Notification";
import {
  CreateNotificationProps,
  NotificationsContext,
} from "./NotificationContext";

export const useNotification = () => {
  const { open, close } = useContext(NotificationsContext);

  const makeNotification = (type: NotificationType) => {
    return ({
      title,
      description,
      timeout = 5000,
    }: Omit<CreateNotificationProps, "type">) => {
      return open({ title, description, timeout, type });
    };
  };

  return {
    open,
    close,
    success: makeNotification("success"),
    info: makeNotification("info"),
    warning: makeNotification("warning"),
    error: makeNotification("error"),
  };
};
