import Notification from './Notification';
import { useNotifications } from './NotificationProvider';

function NotificationContainer() {
  const { removeNotification, notifications } = useNotifications();

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          text={notification.text}
          title={notification.title}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

export default NotificationContainer;
