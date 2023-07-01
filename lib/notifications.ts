```typescript
import { db } from './db';

export const createNotification = async (userId: string, message: string) => {
  const result = await db.query(
    `INSERT INTO notifications (user_id, message) VALUES ($1, $2) RETURNING *`,
    [userId, message]
  );
  return result.rows[0];
};

export const getNotifications = async (userId: string) => {
  const result = await db.query(
    `SELECT * FROM notifications WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};

export const deleteNotification = async (notificationId: string) => {
  const result = await db.query(
    `DELETE FROM notifications WHERE id = $1 RETURNING *`,
    [notificationId]
  );
  return result.rows[0];
};

export const updateNotification = async (notificationId: string, message: string) => {
  const result = await db.query(
    `UPDATE notifications SET message = $2 WHERE id = $1 RETURNING *`,
    [notificationId, message]
  );
  return result.rows[0];
};
```