```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { projects } from '../../../lib/projects';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const allProjects = await projects.getAll();
        res.status(200).json(allProjects);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving projects' });
      }
      break;
    case 'POST':
      try {
        const newProject = await projects.create(req.body);
        res.status(201).json(newProject);
      } catch (error) {
        res.status(500).json({ message: 'Error creating project' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
```