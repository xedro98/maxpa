```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { tasks } from '../../../lib/tasks';
import { auth } from '../../../lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  // Ensure the user is authenticated
  const user = await auth(req);
  if (!user) {
    return res.status(401).json({ message: 'Please authenticate' });
  }

  switch (method) {
    case 'GET':
      try {
        const task = await tasks.readTask(id);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
      } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
      }

    case 'PUT':
      try {
        const updatedTask = await tasks.updateTask(id, req.body);
        return res.status(200).json(updatedTask);
      } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
      }

    case 'DELETE':
      try {
        await tasks.deleteTask(id);
        return res.status(200).json({ message: 'Task deleted' });
      } catch (error) {
        return res.status(500).json({ message: 'Server Error' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```