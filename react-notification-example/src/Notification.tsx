import { useEffect, useState } from "react";

export type NotificationType = "info" | "error" | "success" | "warning";

export interface NotificationProps {
  id?: string;
  title: string;
  type: NotificationType;
  description?: string;
  onClose?: VoidFunction;
  timeout?: number;
}

export const Notification = ({
  title,
  type = "info",
  description,
  onClose,
  timeout,
}: NotificationProps) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(handleClose, timeout);
      return () => clearTimeout(timeoutId);
    }
  }, [timeout]);

  const handleClose = () => {
    setClosing(true);
  };

  const cn = `notification notification--${type} notification--${
    closing ? "closing" : "open"
  }`;

  const handleAnimationEnd = () => {
    if (closing) onClose?.();
  };

  return (
    <div className={cn} onAnimationEnd={handleAnimationEnd}>
      <button
        onClick={handleClose}
        className="notification__close-button"
        type="button"
      >
        X
      </button>
      <h3 className="notification__title">{title}</h3>
      {description ? (
        <p className="notification__description">{description}</p>
      ) : null}
    </div>
  );
};
