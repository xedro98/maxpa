```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { notifications } from '../../../lib/notifications';
import { verifyUser } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const user = await verifyUser(req);

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const notification = await notifications.getNotification(id);
        if (!notification) {
          return res.status(404).json({ message: 'Notification not found' });
        }
        return res.status(200).json(notification);
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }

    case 'PUT':
      try {
        const updatedNotification = await notifications.updateNotification(id, req.body);
        return res.status(200).json(updatedNotification);
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }

    case 'DELETE':
      try {
        await notifications.deleteNotification(id);
        return res.status(200).json({ message: 'Notification deleted' });
      } catch (error) {
        return res.status(500).json({ message: 'Server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
```