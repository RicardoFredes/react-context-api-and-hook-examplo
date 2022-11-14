import { useContext } from "react";
import { NotificationProps, NotificationType } from "./Notification";
import { NotificationContext } from "./NotificationContext";

export type NotifyProps = Pick<
  NotificationProps,
  "title" | "description" | "timeout"
>;

export const useNotification = () => {
  const { add, remove } = useContext(NotificationContext);

  const makeNotification = (type: NotificationType) => {
    return (props: NotifyProps) => add({ ...props, type });
  };

  return {
    add,
    remove,
    info: makeNotification("info"),
    error: makeNotification("error"),
    success: makeNotification("success"),
    warning: makeNotification("warning"),
  };
};
