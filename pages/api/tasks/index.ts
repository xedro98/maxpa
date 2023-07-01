```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { tasks } from '../../../lib/tasks';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const allTasks = await tasks.getAll();
        res.status(200).json(allTasks);
      } catch (error) {
        res.status(500).json({ error: 'Error retrieving tasks' });
      }
      break;
    case 'POST':
      try {
        const newTask = await tasks.create(req.body);
        res.status(201).json(newTask);
      } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```