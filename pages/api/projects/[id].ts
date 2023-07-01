```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { projects } from '../../../lib/projects';
import { db } from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }

  const projectId = req.query.id;

  if (req.method === 'GET') {
    try {
      const project = await projects.readProject(db, projectId);
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Reading project failed.' });
    }
  }

  if (req.method === 'PUT') {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    try {
      const updatedProject = await projects.updateProject(db, projectId, title, description);
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json({ message: 'Updating project failed.' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await projects.deleteProject(db, projectId);
      res.status(200).json({ message: 'Project deleted.' });
    } catch (error) {
      res.status(500).json({ message: 'Deleting project failed.' });
    }
  }
}
```