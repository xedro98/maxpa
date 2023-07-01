```tsx
import React from 'react';

interface NotificationProps {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
}

const Notification: React.FC<NotificationProps> = ({ id, title, message, timestamp }) => {
  return (
    <div className="notification" id={id}>
      <h3 className="notification-title">{title}</h3>
      <p className="notification-message">{message}</p>
      <p className="notification-timestamp">{timestamp.toLocaleString()}</p>
    </div>
  );
};

export default Notification;
```