import { useEffect, useState } from "react";

export type NotificationType = "info" | "warning" | "error" | "success";

export interface NotificationProps {
  id?: string;
  title: string;
  description?: string;
  type: NotificationType;
  timeout?: number;
  onClose?: VoidFunction;
}

export const Notification = ({
  title,
  description,
  type = "info",
  timeout = 5000,
  onClose,
}: NotificationProps) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(handleClose, timeout);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleClose = () => {
    setClosing(true);
  };

  const handleAnimationEnd = () => {
    if (closing) onClose?.();
  };

  const cn = `notification notification--${type} notification--${
    closing ? "closing" : "open"
  }`;

  return (
    <div className={cn} onAnimationEnd={handleAnimationEnd}>
      <button onClick={handleClose} className="notification__close-button">
        X
      </button>
      <h3 className="notification__title">{title}</h3>
      {description ? (
        <p className="notification__description">{description}</p>
      ) : null}
    </div>
  );
};
