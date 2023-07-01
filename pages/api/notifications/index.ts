```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { notifications } from '../../../lib/notifications';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const allNotifications = await notifications.getAll();
        res.status(200).json(allNotifications);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case 'POST':
      try {
        const newNotification = await notifications.create(req.body);
        res.status(201).json(newNotification);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```